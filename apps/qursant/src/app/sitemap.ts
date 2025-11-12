import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/blog-storage';

// WAŻNE: Wymusza dynamiczne generowanie sitemap przy każdym requescie
// Dzięki temu sitemap jest zawsze aktualny, nawet gdy dodajemy nowe blogi po deploymencie
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Wyłącza cache

const routes = [
  {
    url: '/',
    priority: 1.0,
    changeFrequency: 'weekly',
  },
  {
    url: '/o-nas',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    url: '/kursy',
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    url: '/cennik',
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    url: '/rezerwacja',
    priority: 1.0,
    changeFrequency: 'always',
  },
  {
    url: '/pytania',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    url: '/kontakt',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    url: '/galeria',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    url: '/blog',
    priority: 0.9,
    changeFrequency: 'daily',
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.qursant.com.pl';

  // Strony statyczne
  const staticPages = routes.map(({ url, priority, changeFrequency }) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  // Dynamiczne strony blogów (wszystkie opublikowane do dziś)
  const blogPosts = getPosts({ limit: 1000 });
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const blogPages = blogPosts.map((post) => {
    const postDate = new Date(post.publishDate);
    const isRecent = postDate > sevenDaysAgo;

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishDate),
      // Nowe blogi (ostatnie 7 dni) → 'daily' (Google sprawdza częściej!)
      // Starsze blogi → 'weekly' (już stabilne)
      changeFrequency: isRecent ? ('daily' as const) : ('weekly' as const),
      priority: isRecent ? 0.9 : 0.7, // Nowe blogi mają wyższy priorytet
    };
  });

  return [...staticPages, ...blogPages];
}
