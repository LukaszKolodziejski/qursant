import { MetadataRoute } from 'next';

// ===================================================================
// ROBOTS.TXT - SEO OPTIMIZATION
// ===================================================================
// Next.js 15 App Router format - dynamicznie generowany
// ===================================================================

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.qursant.com.pl';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/*.json$',
          '/*?utm_source=*',
          '/*?utm_medium=*',
          '/*?utm_campaign=*',
          '/*?fbclid=*',
          '/*?gclid=*',
        ],
      },
      // Google Bot - pełny dostęp (bez ograniczeń UTM dla analytics)
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      // Bing Bot
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
