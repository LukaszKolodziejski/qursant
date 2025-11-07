// ===================================================================
// API ENDPOINT DLA BLOGÓW - LISTA POSTÓW
// ===================================================================
// Optymalizacje:
// 1. Cache na 1 godzinę (tylko dla GET)
// 2. Lazy loading przez blog-storage (wydajne!)
// 3. Paginacja
// ===================================================================

import { NextRequest, NextResponse } from 'next/server';
import { getPosts, getBlogStats } from '@/lib/blog-storage';
import { BlogFilters } from '@/types/blog';

// Rewalidacja co 1 godzinę
export const revalidate = 3600;
export const dynamic = 'force-dynamic'; // Musi być dynamic żeby czytać pliki z dysku

// GET /api/blog - Pobierz listę blogów
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parsuj parametry
    const categoryParam = searchParams.get('category');
    const filters: BlogFilters = {
      category: categoryParam as BlogFilters['category'],
      tag: searchParams.get('tag') || undefined,
      limit: parseInt(searchParams.get('limit') || '10'),
      page: parseInt(searchParams.get('page') || '1'),
    };

    // Pobierz posty
    const posts = getPosts(filters);

    // Pobierz statystyki jeśli requested
    const includeStats = searchParams.get('includeStats') === 'true';
    const stats = includeStats ? getBlogStats() : undefined;

    return NextResponse.json({
      success: true,
      data: {
        posts,
        stats,
        filters,
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Błąd podczas pobierania blogów',
      },
      { status: 500 }
    );
  }
}

// ===================================================================
// POST nie jest już potrzebny - blogi są w plikach JSON tygodniowych!
// AI generuje pliki week-XX.json bezpośrednio
// ===================================================================
