import { Metadata } from 'next';
import KursyContent from '@/components/pages/KursyContent';

// ===================================================================
// SERVER COMPONENT - SEO OPTIMIZED!
// ===================================================================
// Google widzi całą ofertę kursów natychmiast w HTML
// Animacje działają w Client child component (KursyContent)
// ===================================================================

// Meta tags dla SEO
export const metadata: Metadata = {
  title: 'Kursy Prawa Jazdy - Szkoła Jazdy Qursant Bydgoszcz | Kat. B',
  description:
    'Kursy na prawo jazdy kategorii B w Bydgoszczy ➤ Profesjonalne szkolenie ➤ Doświadczeni instruktorzy ➤ Elastyczne godziny ➤ Wysokie wyniki zdawalności ➤ Zapisy online',
  keywords:
    'kurs prawa jazdy bydgoszcz, prawo jazdy kat b, szkolenie kierowców bydgoszcz, kursy jazdy qursant, zapisz się na kurs',
  openGraph: {
    title: 'Kursy Prawa Jazdy - Szkoła Jazdy Qursant Bydgoszcz',
    description:
      'Profesjonalne kursy na prawo jazdy kategorii B w Bydgoszczy. Zapisz się na najbliższy kurs!',
    url: 'https://www.qursant.com.pl/kursy',
    type: 'website',
    images: [
      {
        url: 'https://www.qursant.com.pl/images/cars/photo-78.webp',
        width: 1200,
        height: 630,
        alt: 'Kursy Qursant',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.qursant.com.pl/kursy',
  },
};

export default function KursyPage() {
  // Schema markup dla Course
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Kurs Prawa Jazdy Kat. B',
    description:
      'Kompleksowy kurs prawa jazdy kategorii B w Bydgoszczy. Zajęcia teoretyczne i praktyczne prowadzone przez doświadczonych instruktorów.',
    provider: {
      '@type': 'AutomotiveBusiness',
      name: 'Szkoła Jazdy Qursant',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ul. Ujejskiego 46a',
        addressLocality: 'Bydgoszcz',
        postalCode: '85-168',
        addressCountry: 'PL',
      },
      telephone: '+48600354556',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      location: {
        '@type': 'Place',
        name: 'Szkoła Jazdy Qursant',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ul. Ujejskiego 46a',
          addressLocality: 'Bydgoszcz',
          postalCode: '85-168',
          addressCountry: 'PL',
        },
      },
    },
    offers: {
      '@type': 'Offer',
      category: 'Kurs prawa jazdy',
      availability: 'https://schema.org/InStock',
    },
  };

  // Schema dla Service (dodatkowy)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Kurs Prawa Jazdy Kategorii B',
    provider: {
      '@type': 'AutomotiveBusiness',
      name: 'Szkoła Jazdy Qursant',
    },
    areaServed: {
      '@type': 'City',
      name: 'Bydgoszcz',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Kandydaci na kierowców',
    },
  };

  return (
    <>
      {/* Schema.org JSON-LD - Google widzi ofertę od razu! */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Client Component z animacjami */}
      <KursyContent />
    </>
  );
}
