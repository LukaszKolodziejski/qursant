// ===================================================================
// SYSTEM PRZECHOWYWANIA BLOGÓW - TYGODNIOWY + LAZY LOADING
// ===================================================================
// ZALETY:
// 1. Lazy loading - ładujemy tylko potrzebne tygodnie (wydajność!)
// 2. Małe pliki JSON - łatwe do zarządzania i generowania przez AI
// 3. Skalowalne - 1000+ blogów = ~143 plików po 7 blogów
// 4. Proste dodawanie nowych tygodni przez AI
// ===================================================================

import fs from 'fs';
import path from 'path';
import { BlogPost, BlogWeek, BlogFilters } from '@/types/blog';

// Folder z plikami tygodniowymi
// process.cwd() w Next.js już wskazuje na katalog apps/qursant
const BLOG_WEEKS_DIR = path.join(process.cwd(), 'data', 'blog-content');

// Cache dla załadowanych tygodni (optymalizacja)
const weekCache = new Map<number, BlogWeek>();

// ===================================================================
// GŁÓWNE FUNKCJE
// ===================================================================

/**
 * Pobiera wszystkie dostępne tygodnie (numerki plików)
 */
export function getAvailableWeeks(): number[] {
  if (!fs.existsSync(BLOG_WEEKS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_WEEKS_DIR);
  const weeks = files
    .filter((f) => f.startsWith('week-') && f.endsWith('.json'))
    .map((f) => parseInt(f.replace('week-', '').replace('.json', '')))
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b);

  return weeks;
}

/**
 * Wczytuje konkretny tydzień (z cache)
 */
export function loadWeek(weekNumber: number): BlogWeek | null {
  // Sprawdź cache
  if (weekCache.has(weekNumber)) {
    const cached = weekCache.get(weekNumber);
    if (cached) return cached;
  }

  const weekPath = path.join(BLOG_WEEKS_DIR, `week-${weekNumber}.json`);

  if (!fs.existsSync(weekPath)) {
    return null;
  }

  try {
    const data = fs.readFileSync(weekPath, 'utf-8');
    const week = JSON.parse(data) as BlogWeek;

    // Zapisz do cache
    weekCache.set(weekNumber, week);

    return week;
  } catch (error) {
    console.error(`Błąd wczytywania week-${weekNumber}.json:`, error);
    return null;
  }
}

/**
 * Pobiera wszystkie posty (ze wszystkich tygodni)
 * UWAGA: Używaj tylko gdy naprawdę potrzebujesz wszystkich!
 */
export function getAllPosts(): BlogPost[] {
  const weeks = getAvailableWeeks();
  const allPosts: BlogPost[] = [];

  for (const weekNum of weeks) {
    const week = loadWeek(weekNum);
    if (week) {
      allPosts.push(...week.posts);
    }
  }

  return allPosts;
}

/**
 * Pobiera posty z filtrowaniem - OPTYMALIZOWANE!
 * Ładuje tylko tygodnie w zakresie dat jeśli podano dateFrom/dateTo
 */
export function getPosts(filters?: BlogFilters): BlogPost[] {
  const now = new Date();
  let posts: BlogPost[] = [];

  // Jeśli podano zakres dat, ładujemy tylko odpowiednie tygodnie
  if (filters?.dateFrom || filters?.dateTo) {
    const weeks = getAvailableWeeks();

    for (const weekNum of weeks) {
      const week = loadWeek(weekNum);
      if (!week) continue;

      // Sprawdź czy tydzień mieści się w zakresie
      const weekStart = week.startDate;
      const weekEnd = week.endDate;

      if (filters.dateFrom && weekEnd < filters.dateFrom) continue;
      if (filters.dateTo && weekStart > filters.dateTo) continue;

      posts.push(...week.posts);
    }
  } else {
    // Wczytaj wszystkie posty
    posts = getAllPosts();
  }

  // Filtruj po dacie publikacji (tylko opublikowane do teraz z uwzględnieniem godziny)
  posts = posts.filter((post) => {
    const publishDate = new Date(post.publishDate);
    return publishDate <= now;
  });

  // Filtruj po kategorii
  if (filters?.category) {
    posts = posts.filter((post) => post.category === filters.category);
  }

  // Filtruj po tagu
  if (filters?.tag) {
    posts = posts.filter((post) => post.tags.includes(filters.tag as string));
  }

  // Sortuj po dacie publikacji (najnowsze pierwsze)
  posts.sort((a, b) => {
    return (
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  });

  // Paginacja
  const page = filters?.page || 1;
  const pageSize = filters?.limit || 10;
  const startIndex = (page - 1) * pageSize;

  return posts.slice(startIndex, startIndex + pageSize);
}

/**
 * Pobiera pojedynczy post po slug - OPTYMALIZOWANE!
 * Szuka w tydzień po tygodniu (lazy loading)
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const weeks = getAvailableWeeks();
  const now = new Date();

  for (const weekNum of weeks) {
    const week = loadWeek(weekNum);
    if (!week) continue;

    const post = week.posts.find((p) => p.slug === slug);
    if (post) {
      // Sprawdź czy już opublikowany (z uwzględnieniem godziny)
      const publishDate = new Date(post.publishDate);
      if (publishDate <= now) {
        return post;
      }
      return null; // Nie pokazuj przyszłych postów
    }
  }

  return null;
}

/**
 * Pobiera posty dla strony głównej (ostatnie 5 opublikowanych)
 */
export function getFeaturedPosts(limit = 5): BlogPost[] {
  return getPosts({ limit, page: 1 });
}

/**
 * Pobiera statystyki blogów
 */
export function getBlogStats() {
  const allPosts = getAllPosts();
  const now = new Date();

  return {
    total: allPosts.length,
    published: allPosts.filter((p) => new Date(p.publishDate) <= now).length,
    scheduled: allPosts.filter((p) => new Date(p.publishDate) > now).length,
    weeks: getAvailableWeeks().length,
  };
}

/**
 * Pobiera posty z konkretnego tygodnia
 */
export function getPostsByWeek(weekNumber: number): BlogPost[] {
  const week = loadWeek(weekNumber);
  return week ? week.posts : [];
}

// ===================================================================
// HELPER FUNCTIONS
// ===================================================================

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ą/g, 'a')
    .replace(/ć/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ł/g, 'l')
    .replace(/ń/g, 'n')
    .replace(/ó/g, 'o')
    .replace(/ś/g, 's')
    .replace(/ź|ż/g, 'z')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function generatePostId(publishDate: string, slug: string): string {
  return `${publishDate}-${slug}`;
}

/**
 * Czyści cache (użyj po dodaniu nowych tygodni)
 */
export function clearCache() {
  weekCache.clear();
}
