import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedPosts } from '@/lib/blog-storage';
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineArrowRight,
} from 'react-icons/hi';

// ===================================================================
// SERVER COMPONENT - SEO OPTIMIZED!
// ===================================================================
// Google widzi wszystkie linki do blogów od razu w HTML!
// ===================================================================

export default function NewsSection() {
  // Pobierz najnowsze 5 blogów bezpośrednio z plików (server-side)
  const posts = getFeaturedPosts(5);

  // Nie pokazuj sekcji jeśli brak postów
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-gradient-to-b from-indigo-950 to-blue-950 py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
              Aktualności i Blog
            </span>
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Najnowsze porady, informacje i aktualności ze Szkoły Jazdy Qursant
          </p>
        </div>

        {/* Featured post (pierwszy) */}
        {posts[0] && (
          <div className="mb-12">
            <Link href={`/blog/${posts[0].slug}`}>
              <div className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                {/* Zdjęcie */}
                <div className="relative w-full h-64 lg:h-auto overflow-hidden">
                  <Image
                    src={`/images/${posts[0].image}`}
                    alt={posts[0].title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Treść */}
                <div className="p-8 flex flex-col justify-center">
                  <span className="inline-block px-4 py-1 bg-yellow-500/20 rounded-full text-yellow-300 text-sm mb-4 w-fit capitalize">
                    {posts[0].category}
                  </span>

                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                    {posts[0].title}
                  </h3>

                  <p className="text-blue-200 mb-6 line-clamp-3">
                    {posts[0].excerpt}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-blue-300 mb-6">
                    <div className="flex items-center gap-2">
                      <HiOutlineCalendar />
                      <span>
                        {new Date(posts[0].publishDate).toLocaleDateString(
                          'pl-PL'
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HiOutlineClock />
                      <span>5 min czytania</span>
                    </div>
                  </div>

                  <div className="flex items-center text-blue-400 group-hover:text-blue-300 font-semibold">
                    <span>Czytaj więcej</span>
                    <HiOutlineArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Pozostałe posty (4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.slice(1, 5).map((post) => (
            <div key={post.id}>
              <Link href={`/blog/${post.slug}`}>
                <div className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:transform hover:scale-105 h-full flex flex-col">
                  {/* Zdjęcie */}
                  <div className="relative w-full h-40 overflow-hidden">
                    <Image
                      src={`/images/${post.image}`}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Treść */}
                  <div className="p-4 flex-1 flex flex-col">
                    <span className="inline-block px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-xs mb-3 w-fit capitalize">
                      {post.category}
                    </span>

                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors flex-1">
                      {post.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-blue-300 mt-auto">
                      <HiOutlineCalendar />
                      <span>
                        {new Date(post.publishDate).toLocaleDateString(
                          'pl-PL',
                          {
                            day: 'numeric',
                            month: 'short',
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA do bloga */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Zobacz wszystkie aktualności
            <HiOutlineArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
