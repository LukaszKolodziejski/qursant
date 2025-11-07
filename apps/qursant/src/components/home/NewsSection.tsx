'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BlogPost } from '@/types/blog';
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineArrowRight,
} from 'react-icons/hi';

export default function NewsSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  const fetchLatestPosts = async () => {
    try {
      const response = await fetch('/api/blog?limit=5&publishedOnly=true');
      const data = await response.json();

      if (data.success) {
        setPosts(data.data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-indigo-950 to-blue-950 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center text-blue-200">
            Ładowanie aktualności...
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null; // Nie pokazuj sekcji jeśli brak postów
  }

  return (
    <section className="relative bg-gradient-to-b from-indigo-950 to-blue-950 py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
              Aktualności i Blog
            </span>
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Najnowsze porady, informacje i aktualności ze Szkoły Jazdy Qursant
          </p>
        </motion.div>

        {/* Featured post (pierwszy) */}
        {posts[0] && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <Link href={`/blog/${posts[0].slug}`}>
              <div className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                {/* Zdjęcie */}
                {posts[0].image && (
                  <div className="relative w-full h-64 lg:h-auto overflow-hidden">
                    <Image
                      src={posts[0].image.url}
                      alt={posts[0].image.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}

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
          </motion.div>
        )}

        {/* Pozostałe posty (4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.slice(1, 5).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:transform hover:scale-105 h-full flex flex-col">
                  {/* Zdjęcie */}
                  {post.image && (
                    <div className="relative w-full h-40 overflow-hidden">
                      <Image
                        src={post.image.url}
                        alt={post.image.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Treść */}
                  <div className="p-4 flex-1 flex flex-col">
                    <span className="inline-block px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-xs mb-3 w-fit capitalize">
                      {post.category}
                    </span>

                    <h4 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors flex-1">
                      {post.title}
                    </h4>

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
            </motion.div>
          ))}
        </div>

        {/* CTA do bloga */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Zobacz wszystkie aktualności
            <HiOutlineArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
