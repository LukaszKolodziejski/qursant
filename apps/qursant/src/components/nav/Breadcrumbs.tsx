'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { poradnikArticles } from '@/data/poradnik';

type BreadcrumbItem = {
  name: string;
  href: string;
};

function toTitle(text: string): string {
  const spaced = text.replace(/-/g, ' ');
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export default function Breadcrumbs(): React.JSX.Element | null {
  const pathname = usePathname();

  if (!pathname || pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);

  const items: BreadcrumbItem[] = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');

    let name = toTitle(segment);

    if (segments[0] === 'poradnik' && index === 1) {
      const article = poradnikArticles.find((a) => a.slug === segment);
      if (article) name = article.title;
    }

    return { name, href };
  });

  const baseUrl = 'https://www.qursant.com.pl';

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Strona główna',
        item: `${baseUrl}/`,
      },
      ...items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 2,
        name: item.name,
        item: `${baseUrl}${item.href}`,
      })),
    ],
  } as const;

  return (
    <nav aria-label="breadcrumb" className="bg-gray-50 dark:bg-gray-800/40">
      <div className="max-w-7xl mx-auto px-4 py-3 text-sm">
        <ol className="flex flex-wrap items-center gap-1 text-gray-600 dark:text-gray-300">
          <li>
            <Link href="/" className="hover:text-blue-600">
              Strona główna
            </Link>
          </li>
          {items.map((item, idx) => (
            <React.Fragment key={item.href}>
              <li className="px-1">/</li>
              <li aria-current={idx === items.length - 1 ? 'page' : undefined}>
                {idx === items.length - 1 ? (
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-blue-600">
                    {item.name}
                  </Link>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </nav>
  );
}
