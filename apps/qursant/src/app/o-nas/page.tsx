import { Metadata } from 'next';
import ONasContent from '@/components/pages/ONasContent';
import {
  getStudentsCount,
  getExperienceYears,
  formatNumber,
} from '@/constants/stats';

// ===================================================================
// SERVER COMPONENT - SEO OPTIMIZED!
// ===================================================================
// Google widzi całą treść natychmiast w HTML
// Animacje działają w Client child component (ONasContent)
// ===================================================================

// Meta tags dla SEO
export const metadata: Metadata = {
  title: 'O Nas - Szkoła Jazdy Qursant Bydgoszcz | Doświadczeni Instruktorzy',
  description:
    'Szkoła Jazdy Qursant w Bydgoszczy ➤ Od 2009 roku kształcimy najlepszych kierowców ➤ Doświadczeni instruktorzy ➤ Nowoczesna flota ➤ Wysokie wyniki zdawalności',
  keywords:
    'szkoła jazdy bydgoszcz o nas, instruktorzy qursant, robert langer, doświadczenie szkoła jazdy, najlepsza szkoła jazdy bydgoszcz',
  openGraph: {
    title: 'O Nas - Szkoła Jazdy Qursant Bydgoszcz',
    description:
      'Poznaj zespół doświadczonych instruktorów szkoły jazdy Qursant w Bydgoszczy. Od 2009 roku z pasją uczymy bezpiecznej jazdy.',
    url: 'https://www.qursant.com.pl/o-nas',
    type: 'website',
    images: [
      {
        url: 'https://www.qursant.com.pl/images/boss/photo-27.webp',
        width: 1200,
        height: 630,
        alt: 'Zespół Qursant',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.qursant.com.pl/o-nas',
  },
};

export default function ONasPage() {
  // Pobierz dane server-side (Google widzi w HTML!)
  const experienceYears = getExperienceYears();
  const studentsCount = formatNumber(getStudentsCount());

  const instruktorzy = [
    {
      name: 'Robert Langer',
      role: 'Właściciel / Instruktor / Egzaminator',
      experience: '20+ lat doświadczenia',
      specialization: 'Kategoria B',
      image: '/images/boss/photo-27.webp',
    },
    {
      name: 'Nasi Instruktorzy',
      role: 'Najlepsi instruktorzy',
      experience: '9-18+ lat doświadczenia',
      staff: [
        'Ryszard - Biuro',
        'Robert - Właściciel',
        'Barbara - Instruktor',
        'Tomasz - Instruktor',
        'Rafał - Instruktor',
        'Krzysztof - Instruktor',
        'Piotr - Instruktor',
        'Zosia - Ratownik medyczny',
      ],
      specialization: 'Kategoria B',
      image: '/images/instructors/photo-3.webp',
    },
    {
      name: 'Siedziba Qursant',
      role: 'Zajęcia teoretyczne',
      experience: `${studentsCount}+ zadowolonych kursantów`,
      specialization: 'Kategoria B',
      image: '/images/office/photo-57.webp',
    },
  ];

  // Schema markup dla Organization
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    '@id': 'https://www.qursant.com.pl',
    name: 'Szkoła Jazdy Qursant',
    alternateName: 'Qursant Bydgoszcz',
    description:
      'Profesjonalna szkoła jazdy w Bydgoszczy. Od 2009 roku kształcimy bezpiecznych i pewnych siebie kierowców.',
    url: 'https://www.qursant.com.pl',
    telephone: '+48600354556',
    email: 'langer.biuro@poczta.fm',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Ujejskiego 46a',
      addressLocality: 'Bydgoszcz',
      postalCode: '85-168',
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 53.1133239,
      longitude: 18.0069507,
    },
    founder: {
      '@type': 'Person',
      name: 'Robert Langer',
      jobTitle: 'Właściciel / Instruktor / Egzaminator',
    },
    foundingDate: '2009',
    areaServed: {
      '@type': 'City',
      name: 'Bydgoszcz',
    },
    image: 'https://www.qursant.com.pl/images/boss/photo-27.webp',
    logo: 'https://www.qursant.com.pl/logo/logo.png',
    sameAs: [
      'https://www.facebook.com/Qursant/',
      'https://www.instagram.com/qursantlangerrobert/',
    ],
  };

  return (
    <>
      {/* Schema.org JSON-LD - Google widzi to od razu! */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Client Component z animacjami */}
      <ONasContent
        instruktorzy={instruktorzy}
        experienceYears={experienceYears}
        studentsCount={studentsCount}
      />
    </>
  );
}
