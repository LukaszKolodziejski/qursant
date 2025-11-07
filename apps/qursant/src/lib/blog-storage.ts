// System przechowywania blogów - JSON file storage
// W przyszłości można zamienić na bazę danych

import fs from 'fs';
import path from 'path';
import { BlogPost, BlogFilters } from '@/types/blog';

// Ścieżka do pliku z blogami
// W Next.js: process.cwd() już jest w apps/qursant, więc tylko 'data'
const BLOG_DATA_PATH = path.join(process.cwd(), 'data', 'blog-posts.json');

// Inicjalizacja pliku jeśli nie istnieje
function initializeBlogStorage() {
  const dataDir = path.join(process.cwd(), 'data');

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(BLOG_DATA_PATH)) {
    fs.writeFileSync(BLOG_DATA_PATH, JSON.stringify([], null, 2));
  }
}

// Odczyt wszystkich postów
export function getAllPosts(): BlogPost[] {
  initializeBlogStorage();

  const data = fs.readFileSync(BLOG_DATA_PATH, 'utf-8');
  const posts = JSON.parse(data);

  return posts;
}

// Zapis wszystkich postów
function savePosts(posts: BlogPost[]) {
  fs.writeFileSync(BLOG_DATA_PATH, JSON.stringify(posts, null, 2));
}

// Pobierz posty z filtrowaniem
export function getPosts(filters?: BlogFilters): BlogPost[] {
  let posts = getAllPosts();
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // Filtruj po dacie publikacji (tylko opublikowane)
  if (filters?.publishedOnly !== false) {
    posts = posts.filter(
      (post) =>
        post.status === 'published' ||
        (post.status === 'scheduled' && post.publishDate <= today)
    );
  }

  // Filtruj po kategorii
  if (filters?.category) {
    posts = posts.filter((post) => post.category === filters.category);
  }

  // Filtruj po tagu
  if (filters?.tag) {
    posts = posts.filter((post) => post.tags.includes(filters.tag || ''));
  }

  // Filtruj wyróżnione
  if (filters?.featured) {
    posts = posts.filter((post) => post.featured === true);
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

// Pobierz pojedynczy post po slug
export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  const today = new Date().toISOString().split('T')[0];

  const post = posts.find((p) => p.slug === slug);

  if (!post) return null;

  // Sprawdź czy post jest opublikowany
  if (
    post.status === 'draft' ||
    (post.status === 'scheduled' && post.publishDate > today)
  ) {
    return null; // Nie pokazuj nieopublikowanych
  }

  return post;
}

// Pobierz posty dla strony głównej (ostatnie 5)
export function getFeaturedPosts(limit = 5): BlogPost[] {
  return getPosts({ publishedOnly: true, limit, page: 1 });
}

// Dodaj nowy post
export function addPost(post: BlogPost): BlogPost {
  const posts = getAllPosts();
  const now = new Date().toISOString();

  const newPost: BlogPost = {
    ...post,
    id: post.id || generateId(),
    slug: post.slug || generateSlug(post.title),
    createdAt: now,
    updatedAt: now,
  };

  posts.push(newPost);
  savePosts(posts);

  return newPost;
}

// Aktualizuj post
export function updatePost(
  id: string,
  updates: Partial<BlogPost>
): BlogPost | null {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) return null;

  posts[index] = {
    ...posts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  savePosts(posts);
  return posts[index];
}

// Usuń post
export function deletePost(id: string): boolean {
  const posts = getAllPosts();
  const filtered = posts.filter((p) => p.id !== id);

  if (filtered.length === posts.length) return false;

  savePosts(filtered);
  return true;
}

// Pobierz statystyki
export function getBlogStats() {
  const posts = getAllPosts();
  const today = new Date().toISOString().split('T')[0];

  return {
    total: posts.length,
    published: posts.filter(
      (p) =>
        p.status === 'published' ||
        (p.status === 'scheduled' && p.publishDate <= today)
    ).length,
    scheduled: posts.filter(
      (p) => p.status === 'scheduled' && p.publishDate > today
    ).length,
    draft: posts.filter((p) => p.status === 'draft').length,
  };
}

// Helper functions
function generateId(): string {
  return `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function generateSlug(title: string): string {
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
