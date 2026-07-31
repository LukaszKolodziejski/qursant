// ===================================================================
// SERVER COMPONENT - SEO OPTIMIZED!
// ===================================================================
// Strona cennika jako Server Component - lepsze SEO!
// Wszystkie animacje w CennikContent (Client child)
// ===================================================================

import { Metadata } from 'next';
import CennikContent from '@/components/pages/CennikContent';
import { PRICES, EXPRESS_COURSE_UNAVAILABLE_UNTIL } from '@/constants/prices';
import { CONTACT } from '@/constants/contact';

export const metadata: Metadata = {
  title: 'Cennik kursów na prawo jazdy - Szkoła Jazdy Qursant Bydgoszcz',
  description:
    'Przejrzysty cennik kursów prawa jazdy w Bydgoszczy. Kurs podstawowy, ekspresowy, jazdy doszkalające. Elastyczne formy płatności i raty. Sprawdź nasze ceny!',
  keywords: [
    'cennik prawa jazdy bydgoszcz',
    'ile kosztuje prawo jazdy',
    'ceny kursów jazdy bydgoszcz',
    'kurs na prawo jazdy cena',
    'raty na prawo jazdy',
    'cennik qursant',
  ],
  alternates: {
    canonical: 'https://www.qursant.com.pl/cennik',
  },
  openGraph: {
    title: 'Cennik kursów na prawo jazdy - Szkoła Jazdy Qursant Bydgoszcz',
    description:
      'Przejrzysty cennik kursów prawa jazdy w Bydgoszczy. Kurs podstawowy, ekspresowy, jazdy doszkalające. Elastyczne formy płatności i raty.',
    url: 'https://www.qursant.com.pl/cennik',
    type: 'website',
    images: ['https://www.qursant.com.pl/images/cars/photo-78.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cennik kursów na prawo jazdy - Szkoła Jazdy Qursant Bydgoszcz',
    description:
      'Przejrzysty cennik kursów prawa jazdy w Bydgoszczy. Kurs podstawowy, ekspresowy, jazdy doszkalające. Elastyczne formy płatności i raty.',
    images: ['https://www.qursant.com.pl/images/cars/photo-78.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function CennikPage() {
  // Generowanie aktualnej daty (server-side)
  const date = new Date();
  const months = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ];
  const currentDate = `${months[date.getMonth()]} ${date.getFullYear()}`;

  // Schema.org - PriceSpecification dla cennika
  const priceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Kurs prawa jazdy',
    provider: {
      '@type': 'Organization',
      name: 'Szkoła Jazdy Qursant',
      url: 'https://www.qursant.com.pl',
      telephone: CONTACT.PHONE_RAW,
    },
    areaServed: {
      '@type': 'City',
      name: 'Bydgoszcz',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Kurs Podstawowy na prawo jazdy kat. B',
        description: '2-3 jazdy w tygodniu, teoria stacjonarnie lub E-learning',
        price: PRICES.COURSE.BASIC,
        priceCurrency: 'PLN',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Kurs Ekspresowy na prawo jazdy kat. B',
        description: '5-7 jazd w tygodniu, szybsza realizacja kursu',
        price: PRICES.COURSE.EXPRESS,
        priceCurrency: 'PLN',
        availability:
          EXPRESS_COURSE_UNAVAILABLE_UNTIL !== null
            ? 'https://schema.org/OutOfStock'
            : 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Jazdy doszkalające - nasi kursanci',
        price: PRICES.ADDITIONAL.TRAINING_OWN_STUDENT,
        priceCurrency: 'PLN',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Jazdy doszkalające - osoby z zewnątrz',
        price: PRICES.ADDITIONAL.TRAINING_EXTERNAL,
        priceCurrency: 'PLN',
        availability: 'https://schema.org/InStock',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(priceSchema),
        }}
      />
      <CennikContent currentDate={currentDate} />
    </>
  );
}
