// API endpoint dla blogów - GET (lista) i POST (dodaj nowy)

import { NextRequest, NextResponse } from 'next/server';
import { getPosts, addPost, getBlogStats } from '@/lib/blog-storage';
import { BlogPost, BlogFilters } from '@/types/blog';

// Cache API na 1 godzinę (3600 sekund) - poprawia performance!
export const revalidate = 3600;

// GET /api/blog - Pobierz listę blogów
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parsuj parametry
    const categoryParam = searchParams.get('category');
    const filters: BlogFilters = {
      category: categoryParam as BlogFilters['category'],
      tag: searchParams.get('tag') || undefined,
      featured: searchParams.get('featured') === 'true',
      limit: parseInt(searchParams.get('limit') || '10'),
      page: parseInt(searchParams.get('page') || '1'),
      publishedOnly: searchParams.get('publishedOnly') !== 'false', // Domyślnie true
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

// POST /api/blog - Dodaj nowy blog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Walidacja podstawowych pól
    if (!body.title || !body.content || !body.publishDate) {
      return NextResponse.json(
        {
          success: false,
          error: 'Brak wymaganych pól: title, content, publishDate',
        },
        { status: 400 }
      );
    }

    // Dodaj post
    const newPost = addPost(body as BlogPost);

    return NextResponse.json({
      success: true,
      data: newPost,
      message: 'Blog został dodany pomyślnie',
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Błąd podczas tworzenia bloga',
      },
      { status: 500 }
    );
  }
}
