import { MetadataRoute } from 'next';
import { locales } from '../i18n/settings';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/courses',
    '/pricing',
    '/booking',
    '/faq',
    '/contact',
  ];

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `https://qursant.pl${locale === 'pl' ? '' : `/${locale}`}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );
}
