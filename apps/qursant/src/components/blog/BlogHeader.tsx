// ===================================================================
// HEADER BLOGA - Tytuł, autor, kategoria, data
// ===================================================================

import React from 'react';
import { BlogPost } from '@/types/blog';
import Image from 'next/image';

interface BlogHeaderProps {
  post: BlogPost;
}

export function BlogHeader({ post }: BlogHeaderProps) {
  // Kategoria -> ładny tekst
  const categoryLabels: Record<string, string> = {
    poradniki: 'Poradnik',
    ceny: 'Cennik',
    prawo: 'Prawo',
    egzaminy: 'Egzaminy',
    porady: 'Porady',
    aktualnosci: 'Aktualności',
    lokalne: 'Lokalne',
  };

  // Format daty: 4 listopada 2025
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <header className="blog-header">
      {/* Kategoria badge */}
      <div className="blog-category-badge">{categoryLabels[post.category]}</div>

      {/* Tytuł */}
      <h1 className="blog-title">{post.title}</h1>

      {/* Excerpt */}
      <p className="blog-excerpt">{post.excerpt}</p>

      {/* Meta info */}
      <div className="blog-meta">
        <span className="blog-author">✍️ {post.author}</span>
        <span className="blog-date">📅 {formatDate(post.publishDate)}</span>
        <span className="blog-reading-time">⏱️ 5 min czytania</span>
      </div>

      {/* Główne zdjęcie */}
      <div className="blog-image-wrapper">
        <Image
          src={`/images/${post.image}`}
          alt={post.title}
          width={1200}
          height={600}
          className="blog-image"
          priority
        />
      </div>

      {/* Tagi */}
      {post.tags && post.tags.length > 0 && (
        <div className="blog-tags">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="blog-tag">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
