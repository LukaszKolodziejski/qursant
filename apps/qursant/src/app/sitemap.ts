import { MetadataRoute } from 'next';

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
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.qursant.com.pl';

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
