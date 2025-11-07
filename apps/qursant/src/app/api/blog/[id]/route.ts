// API endpoint dla pojedynczego bloga - GET, PUT, DELETE

import { NextRequest, NextResponse } from 'next/server';
import {
  getPostBySlug,
  updatePost,
  deletePost,
  getAllPosts,
} from '@/lib/blog-storage';

// Cache API na 1 godzinę - poprawia performance!
export const revalidate = 3600;

// GET /api/blog/[id] - Pobierz pojedynczy blog
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Spróbuj znaleźć po slug lub id
    let post = getPostBySlug(id);

    if (!post) {
      const posts = getAllPosts();
      post = posts.find((p) => p.id === id) || null;
    }

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

// PUT /api/blog/[id] - Aktualizuj blog
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedPost = updatePost(id, body);

    if (!updatedPost) {
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
      data: updatedPost,
      message: 'Blog został zaktualizowany',
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Błąd podczas aktualizacji bloga',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[id] - Usuń blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const success = deletePost(id);

    if (!success) {
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
      message: 'Blog został usunięty',
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Błąd podczas usuwania bloga',
      },
      { status: 500 }
    );
  }
}
