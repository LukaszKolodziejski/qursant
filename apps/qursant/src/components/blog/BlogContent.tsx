// ===================================================================
// KOMPONENTY DO RENDEROWANIA CONTENTU BLOGÓW
// ===================================================================
// Renderują strukturę z JSON (bez HTML w danych!)
// Jednolity styling dla wszystkich blogów
// ===================================================================

import React from 'react';
import { BlogPost, BlogSection, BlogFAQ } from '@/types/blog';
import Link from 'next/link';

// ===================================================================
// GŁÓWNY KOMPONENT - RENDERUJE CAŁY BLOG
// ===================================================================

interface BlogContentProps {
  post: BlogPost;
}

export function BlogContent({ post }: BlogContentProps) {
  return (
    <article className="blog-article">
      {/* Sekcje artykułu */}
      {post.sections.map((section, index) => (
        <BlogSectionComponent key={index} section={section} />
      ))}

      {/* Tips (jeśli są) */}
      {post.tips && post.tips.length > 0 && <BlogTips tips={post.tips} />}

      {/* FAQ (jeśli jest) */}
      {post.faq && post.faq.length > 0 && <BlogFAQSection faq={post.faq} />}

      {/* CTA Box */}
      <BlogCTA />
    </article>
  );
}

// ===================================================================
// KOMPONENT SEKCJI
// ===================================================================

interface BlogSectionProps {
  section: BlogSection;
}

function BlogSectionComponent({ section }: BlogSectionProps) {
  return (
    <section className="blog-section">
      {/* Nagłówek sekcji */}
      <h2 className="section-heading">{section.heading}</h2>

      {/* Akapity */}
      {section.paragraphs?.map((paragraph, idx) => (
        <p key={idx} className="section-paragraph">
          {paragraph}
        </p>
      ))}

      {/* Lista punktowana */}
      {section.list && section.list.length > 0 && (
        <ul className="section-list">
          {section.list.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}

      {/* Lista numerowana */}
      {section.numberedList && section.numberedList.length > 0 && (
        <ol className="section-numbered-list">
          {section.numberedList.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ol>
      )}

      {/* Cytat */}
      {section.quote && (
        <blockquote className="section-quote">{section.quote}</blockquote>
      )}

      {/* Ważna informacja */}
      {section.important && (
        <div className="section-important">
          <span className="important-icon">💡</span>
          <p>{section.important}</p>
        </div>
      )}
    </section>
  );
}

// ===================================================================
// TIPS BOX - WSKAZÓWKI
// ===================================================================

interface BlogTipsProps {
  tips: string[];
}

function BlogTips({ tips }: BlogTipsProps) {
  return (
    <div className="tips-box">
      <h3 className="tips-heading">💡 Najważniejsze wskazówki</h3>
      <ul className="tips-list">
        {tips.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}

// ===================================================================
// FAQ SEKCJA
// ===================================================================

interface BlogFAQSectionProps {
  faq: BlogFAQ[];
}

function BlogFAQSection({ faq }: BlogFAQSectionProps) {
  return (
    <div className="faq-section">
      <h2 className="faq-heading">❓ Najczęściej zadawane pytania</h2>
      <div className="faq-list">
        {faq.map((item, idx) => (
          <div key={idx} className="faq-item">
            <h3 className="faq-question">{item.q}</h3>
            <p className="faq-answer">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===================================================================
// CTA BOX - CALL TO ACTION
// ===================================================================

function BlogCTA() {
  return (
    <div className="cta-box">
      <h3 className="cta-heading">Gotowy na rozpoczęcie kursu?</h3>
      <p className="cta-text">
        Zapisz się już dziś do Szkoły Jazdy Qursant i dołącz do grona
        zadowolonych kursantów!
      </p>
      <div className="cta-buttons">
        <Link href="/rezerwacja" className="btn-primary">
          Zarezerwuj miejsce
        </Link>
        <Link href="/kontakt" className="btn-secondary">
          Skontaktuj się
        </Link>
      </div>
      <p className="cta-contact">
        📞 <strong>600 354 556</strong> | 📍 ul. Ujejskiego 46a, Bydgoszcz
      </p>
    </div>
  );
}

// ===================================================================
// EKSPORT
// ===================================================================

export { BlogSectionComponent, BlogTips, BlogFAQSection, BlogCTA };
