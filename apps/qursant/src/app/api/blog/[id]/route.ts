// ===================================================================
// API ENDPOINT DLA POJEDYNCZEGO BLOGA
// ===================================================================
// Tylko GET - blogi są w plikach JSON (read-only)
// ===================================================================

import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/blog-storage';

// Rewalidacja co 1 godzinę
export const revalidate = 3600;
export const dynamic = 'force-dynamic'; // Musi być dynamic żeby czytać pliki z dysku

// GET /api/blog/[id] - Pobierz pojedynczy blog
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Znajdź post po slug (optymalizowane - lazy loading!)
    const post = getPostBySlug(id);

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          error: 'Blog nie został znaleziony',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Błąd podczas pobierania bloga',
      },
      { status: 500 }
    );
  }
}

// ===================================================================
// PUT i DELETE nie są potrzebne - blogi są w plikach JSON (read-only)
// Jeśli chcesz edytować/usunąć - edytuj plik week-XX.json bezpośrednio
// ===================================================================
