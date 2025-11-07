// ===================================================================
// TYPY DLA SYSTEMU BLOGOWEGO - UPROSZCZONE (TYLKO PLAIN TEXT)
// ===================================================================
// Ten system jest zaprojektowany tak, żeby:
// 1. AI generowało TYLKO tekst (bez HTML/CSS)
// 2. Frontend renderował strukturę (komponenty React)
// 3. Pliki JSON były małe i łatwe do zarządzania
// 4. System był skalowalny na 1000+ blogów
// ===================================================================

// Kategorie blogów
export type BlogCategory =
  | 'poradniki' // Jak zdać egzamin, jak parkować itp
  | 'ceny' // Ile kosztuje, cenniki
  | 'prawo' // PKK, przepisy, wymagania
  | 'egzaminy' // Wszystko o egzaminach
  | 'porady' // Tips & tricks
  | 'aktualnosci' // Nowości w szkole, osiągnięcia
  | 'lokalne'; // Lokalne informacje o Bydgoszczy

// Sekcja artykułu - może zawierać tekst, listy, cytaty
export interface BlogSection {
  heading: string; // Nagłówek sekcji (np. "Wprowadzenie")
  paragraphs?: string[]; // Akapity tekstowe
  list?: string[]; // Lista punktowana
  numberedList?: string[]; // Lista numerowana
  quote?: string; // Cytat/ważna informacja
  important?: string; // Ważna adnotacja
}

// FAQ - pytania i odpowiedzi
export interface BlogFAQ {
  q: string; // Pytanie
  a: string; // Odpowiedź
}

// Główny typ BlogPost - TYLKO PLAIN TEXT!
export interface BlogPost {
  // === PODSTAWOWE INFO ===
  id: string; // Format: YYYY-MM-DD-slug
  slug: string; // URL-friendly slug
  title: string; // Tytuł artykułu
  excerpt: string; // Krótki opis (150-200 znaków)
  publishDate: string; // Data publikacji (YYYY-MM-DD)

  // === AUTOR ===
  author: string; // Imię i nazwisko (np. "Robert Langer")

  // === KATEGORYZACJA ===
  category: BlogCategory;
  tags: string[]; // SEO tags

  // === ZDJĘCIE ===
  image: string; // Ścieżka relatywna (np. "instructors/photo-7.jpg")

  // === TREŚĆ ARTYKUŁU (STRUKTURA) ===
  sections: BlogSection[]; // Główne sekcje artykułu

  // === DODATKOWE ELEMENTY ===
  tips?: string[]; // Krótkie wskazówki (box z tipami)
  faq?: BlogFAQ[]; // Sekcja FAQ

  // === SEO ===
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

// ===================================================================
// TYPY DLA SYSTEMU TYGODNIOWEGO (lazy loading)
// ===================================================================

export interface BlogWeek {
  week: number; // Numer tygodnia (1, 2, 3, ...)
  startDate: string; // Data startu tygodnia (YYYY-MM-DD)
  endDate: string; // Data końca tygodnia (YYYY-MM-DD)
  posts: BlogPost[]; // 7 blogów (jeden na dzień)
}

// ===================================================================
// TYPY DLA API
// ===================================================================

export interface BlogFilters {
  category?: BlogCategory;
  tag?: string;
  limit?: number; // Ile postów na stronę
  page?: number; // Numer strony
  dateFrom?: string; // Filtruj od daty
  dateTo?: string; // Filtruj do daty
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ===================================================================
// TYPY DLA GENERATORA (helper dla AI)
// ===================================================================

export interface BlogGeneratorInput {
  title: string;
  category: BlogCategory;
  tags: string[];
  publishDate: string;
  image: string;
  // AI wypełnia tylko sections, tips, faq
  sections: BlogSection[];
  tips?: string[];
  faq?: BlogFAQ[];
}
