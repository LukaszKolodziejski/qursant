'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Script from 'next/script';
import { BlogPost } from '@/types/blog';
import { BlogContent } from '@/components/blog/BlogContent';
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineArrowLeft,
  HiOutlineShare,
} from 'react-icons/hi';

// SEO: Dynamiczne meta tagi dla każdego bloga
// UWAGA: To musi być w osobnym pliku bo używa useParams (client-side)
// Alternatywnie można użyć middleware lub getStaticProps

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  // SEO: Dynamiczne meta tagi
  useEffect(() => {
    if (post) {
      // Aktualizuj title
      document.title =
        post.seo?.metaTitle || `${post.title} | Szkoła Jazdy Qursant Bydgoszcz`;

      // Aktualizuj meta description
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          'content',
          post.seo?.metaDescription || post.excerpt
        );
      }

      // Aktualizuj meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords && post.seo?.keywords) {
        metaKeywords.setAttribute('content', post.seo.keywords.join(', '));
      }

      // Aktualizuj og:title
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', post.title);
      }

      // Aktualizuj og:description
      const ogDescription = document.querySelector(
        'meta[property="og:description"]'
      );
      if (ogDescription) {
        ogDescription.setAttribute('content', post.excerpt);
      }

      // Aktualizuj og:image
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute(
          'content',
          `https://www.qursant.com.pl/images/${post.image}`
        );
      }
    }
  }, [post]);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        const data = await response.json();

        if (data.success) {
          setPost(data.data);
          // Pobierz powiązane posty
          fetchRelatedPosts(data.data.category);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedPosts = async (category: string) => {
      try {
        const response = await fetch(`/api/blog?category=${category}&limit=3`);
        const data = await response.json();

        if (data.success) {
          // Usuń obecny post z powiązanych
          setRelatedPosts(
            data.data.posts.filter((p: BlogPost) => p.slug !== slug)
          );
        }
      } catch (error) {
        console.error('Error fetching related posts:', error);
      }
    };

    fetchPost();
  }, [slug]);

  const sharePost = () => {
    if (navigator.share && post) {
      navigator
        .share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
        .catch((err) => console.log('Error sharing:', err));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Ładowanie...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl text-white mb-4">
            Blog nie został znaleziony
          </h1>
          <Link
            href="/blog"
            className="text-blue-400 hover:text-blue-300 flex items-center gap-2 justify-center"
          >
            <HiOutlineArrowLeft />
            Wróć do bloga
          </Link>
        </div>
      </div>
    );
  }

  return (
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
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
              <button
                onClick={sharePost}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <HiOutlineShare />
                <span>Udostępnij</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Treść artykułu */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Excerpt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 mb-8 p-6 bg-blue-900/30 rounded-xl border-l-4 border-blue-500"
            >
              {post.excerpt}
            </motion.div>

            {/* Główna treść - NOWE KOMPONENTY! */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <BlogContent post={post} />
            </motion.div>

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

      {/* Schema.org JSON-LD dla SEO */}
      {post && (
        <Script
          id="blog-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.excerpt,
              image: `https://www.qursant.com.pl/images/${post.image}`,
              datePublished: post.publishDate,
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
            }),
          }}
        />
      )}
    </div>
  );
}
