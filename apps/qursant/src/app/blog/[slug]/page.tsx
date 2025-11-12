import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getPosts } from '@/lib/blog-storage';
import { BlogContent } from '@/components/blog/BlogContent';
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineArrowLeft,
} from 'react-icons/hi';

// ===================================================================
// SERVER COMPONENT - SEO OPTIMIZED!
// ===================================================================
// ZALETY:
// 1. Meta tagi generowane server-side (Google widzi od razu!)
// 2. Schema markup w HTML (nie JavaScript)
// 3. Pełna treść dostępna podczas crawlowania
// 4. Szybsze indeksowanie przez Google
// ===================================================================

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// ===================================================================
// METADATA - Dynamiczne meta tagi dla każdego bloga (SEO!)
// ===================================================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Blog nie znaleziony | Szkoła Jazdy Qursant',
    };
  }

  const baseUrl = 'https://www.qursant.com.pl';
  const blogUrl = `${baseUrl}/blog/${post.slug}`;
  const imageUrl = `${baseUrl}/images/${post.image}`;

  return {
    title: post.seo?.metaTitle || `${post.title} | Szkoła Jazdy Qursant`,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords?.join(', '),
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: 'Szkoła Jazdy Qursant',
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: blogUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: blogUrl,
      siteName: 'Szkoła Jazdy Qursant',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'pl_PL',
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
      creator: '@qursant',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// ===================================================================
// GŁÓWNY KOMPONENT - Server Component (async!)
// ===================================================================
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // Pobierz post bezpośrednio z plików (server-side)
  const post = getPostBySlug(slug);

  // 404 jeśli nie znaleziono
  if (!post) {
    notFound();
  }

  // Pobierz powiązane posty (ta sama kategoria)
  const relatedPostsAll = getPosts({ category: post.category, limit: 10 });
  const relatedPosts = relatedPostsAll
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  // ===================================================================
  // SCHEMA.ORG JSON-LD - SEO (w HTML, nie JavaScript!)
  // ===================================================================
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `https://www.qursant.com.pl/images/${post.image}`,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Szkoła Jazdy Qursant',
      url: 'https://www.qursant.com.pl',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.qursant.com.pl/logo/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.qursant.com.pl/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    inLanguage: 'pl-PL',
  };

  return (
    <>
      {/* Schema.org JSON-LD - Google widzi to od razu! */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-indigo-950 to-gray-900">
        {/* Hero z obrazkiem */}
        <section className="relative h-[60vh] overflow-hidden">
          <Image
            src={`/images/${post.image}`}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/80 to-transparent"></div>

          <div className="relative z-10 container mx-auto px-6 h-full flex items-end pb-12">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <Link
                href="/blog"
                className="text-blue-300 hover:text-blue-200 flex items-center gap-2 mb-4"
              >
                <HiOutlineArrowLeft />
                Wróć do bloga
              </Link>

              {/* Kategoria */}
              <span className="inline-block px-4 py-1 bg-blue-500/30 rounded-full text-blue-200 text-sm mb-4 capitalize">
                {post.category}
              </span>

              {/* Tytuł */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-6 text-blue-200">
                <div className="flex items-center gap-2">
                  <HiOutlineCalendar />
                  <span>
                    {new Date(post.publishDate).toLocaleDateString('pl-PL')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineClock />
                  <span>5 min czytania</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Treść artykułu */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Excerpt */}
              <div className="text-xl text-blue-100 mb-8 p-6 bg-blue-900/30 rounded-xl border-l-4 border-blue-500">
                {post.excerpt}
              </div>

              {/* Główna treść */}
              <div>
                <BlogContent post={post} />
              </div>

              {/* Tagi */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-blue-500/20">
                  <h3 className="text-white font-semibold mb-4">Tagi:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-200 text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-12 p-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Gotowy na kurs prawa jazdy?
                </h3>
                <p className="text-blue-200 mb-6">
                  Zapisz się już dziś i dołącz do grona zadowolonych kursantów
                  Szkoły Jazdy Qursant!
                </p>
                <Link
                  href="/rezerwacja"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Zarezerwuj miejsce na kursie
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Powiązane posty */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-blue-900/20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Zobacz również
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="relative w-full h-40">
                        <Image
                          src={`/images/${relatedPost.image}`}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-blue-200 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
