// Typy dla systemu blogowego

export interface BlogPost {
  id: string; // Unikalny identyfikator (slug-friendly)
  slug: string; // URL-friendly slug
  title: string; // Tytuł bloga
  excerpt: string; // Krótki opis (150-200 znaków)
  content: string; // Pełna treść (markdown lub HTML)
  publishDate: string; // Data publikacji (YYYY-MM-DD)
  author: {
    name: string;
    role: string;
  };
  category: BlogCategory;
  tags: string[]; // SEO tags
  image: {
    url: string; // Główne zdjęcie
    alt: string; // ALT text dla SEO
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl?: string;
  };
  links?: {
    internal?: string[]; // Linki do innych stron na stronie
    external?: { url: string; title: string }[]; // Linki do konkurencji itp
  };
  status: 'draft' | 'scheduled' | 'published'; // Status wpisu
  views?: number; // Opcjonalnie - liczba wyświetleń
  featured?: boolean; // Czy wyróżniony na stronie głównej
  createdAt: string; // Data utworzenia
  updatedAt: string; // Data ostatniej aktualizacji
}

export type BlogCategory =
  | 'poradniki' // Jak zdać egzamin, jak parkować itp
  | 'ceny' // Ile kosztuje, cenniki
  | 'prawo' // PKK, przepisy, wymagania
  | 'egzaminy' // Wszystko o egzaminach
  | 'porady' // Tips & tricks
  | 'aktualnosci' // Nowości w szkole, osiągnięcia
  | 'lokalne'; // Lokalne informacje o Bydgoszczy

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface BlogFilters {
  category?: BlogCategory;
  tag?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
  publishedOnly?: boolean; // Czy pokazywać tylko opublikowane (na podstawie daty)
}
