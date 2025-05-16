import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/about',
    '/courses',
    '/pricing',
    '/booking',
    '/faq',
    '/contact',
  ];

  return routes.flatMap((route) => ({
    url: `https://www.qursant.com.pl${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
