import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPosts } from '@/lib/blog-storage';
import { BlogCategory } from '@/types/blog';
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineTag,
} from 'react-icons/hi';

// ===================================================================
// SERVER COMPONENT - SEO OPTIMIZED!
// ===================================================================
// Google widzi wszystkie linki do blogów od razu w HTML!
// Filtry kategorii przez URL params = SEO friendly!
// ===================================================================

type Props = {
  searchParams: Promise<{ category?: string }>;
};

// Meta tags dla strony bloga
export const metadata: Metadata = {
  title: 'Blog i Aktualności - Szkoła Jazdy Qursant Bydgoszcz',
  description:
    'Blog szkoły jazdy w Bydgoszczy ➤ Porady dla kursantów ➤ Aktualności ➤ Jak zdać egzamin ➤ Informacje o nauce jazdy ✓ Sprawdź najnowsze wpisy!',
  keywords:
    'blog szkoła jazdy, porady nauka jazdy, jak zdać egzamin bydgoszcz, aktualności szkoła jazdy, blog qursant',
  openGraph: {
    title: 'Blog i Aktualności - Szkoła Jazdy Qursant Bydgoszcz',
    description:
      'Blog szkoły jazdy w Bydgoszczy. Porady, aktualności i wszystko o nauce jazdy.',
    url: 'https://www.qursant.com.pl/blog',
    type: 'website',
  },
};

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const selectedCategory = params.category;

  // Walidacja kategorii - upewnij się że to prawidłowy BlogCategory
  const validCategories: BlogCategory[] = [
    'poradniki',
    'ceny',
    'prawo',
    'egzaminy',
    'porady',
    'aktualnosci',
    'lokalne',
  ];
  const category: BlogCategory | undefined =
    selectedCategory &&
    validCategories.includes(selectedCategory as BlogCategory)
      ? (selectedCategory as BlogCategory)
      : undefined;

  // Pobierz posty bezpośrednio z plików (server-side)
  const posts = getPosts({
    category,
    limit: 100, // Pokaż wszystkie opublikowane
  });

  const categories = [
    { value: 'poradniki', label: 'Poradniki' },
    { value: 'ceny', label: 'Ceny' },
    { value: 'prawo', label: 'Prawo' },
    { value: 'egzaminy', label: 'Egzaminy' },
    { value: 'porady', label: 'Porady' },
    { value: 'aktualnosci', label: 'Aktualności' },
    { value: 'lokalne', label: 'Lokalne' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-indigo-950 to-gray-900">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                Blog i Aktualności
              </span>
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Porady, aktualności i wszystko o nauce jazdy w Bydgoszczy
            </p>
          </div>

          {/* Filtry kategorii - SEO friendly links! */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                !selectedCategory
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-blue-200 hover:bg-white/20'
              }`}
            >
              Wszystkie
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.value}
                href={`/blog?category=${cat.value}`}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === cat.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-blue-200 hover:bg-white/20'
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lista blogów */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center text-blue-200 text-xl">
              Brak blogów w tej kategorii
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div key={post.id} className="group">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:transform hover:scale-105">
                      {/* Zdjęcie */}
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image
                          src={`/images/${post.image}`}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Treść */}
                      <div className="p-6">
                        {/* Kategoria */}
                        <div className="flex items-center gap-2 mb-3">
                          <HiOutlineTag className="text-blue-400" />
                          <span className="text-sm text-blue-300 capitalize">
                            {post.category}
                          </span>
                        </div>

                        {/* Tytuł */}
                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-blue-200 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-sm text-blue-300">
                          <div className="flex items-center gap-1">
                            <HiOutlineCalendar />
                            <span>
                              {new Date(post.publishDate).toLocaleDateString(
                                'pl-PL'
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <HiOutlineClock />
                            <span>5 min czytania</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
