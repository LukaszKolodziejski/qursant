// ===================================================================
// 📊 HOMEPAGE SCHEMA.ORG - Pre-computed for Performance
// ===================================================================
// Przeniesione z page.tsx dla lepszej wydajności:
// - Zmniejszenie parse time z 711ms
// - Łatwiejsze utrzymanie
// - Reusable schemas
// ===================================================================

import { CONTACT } from '@/constants/contact';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutomotiveBusiness',
  '@id': 'https://www.qursant.com.pl/#organization',
  name: 'Szkoła Jazdy Qursant',
  alternateName: 'Qursant Bydgoszcz',
  url: 'https://www.qursant.com.pl',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.qursant.com.pl/logo/logo-white.png',
    width: '300',
    height: '100',
  },
  image: [
    'https://www.qursant.com.pl/images/cars/photo-77.webp',
    'https://www.qursant.com.pl/images/cars/photo-78.webp',
    'https://www.qursant.com.pl/images/instructors/photo-1.webp',
  ],
  description:
    'Profesjonalna szkoła jazdy w Bydgoszczy. Od 2009 roku kształcimy najlepszych kierowców. Najwyższa zdawalność, doświadczeni instruktorzy, nowoczesna flota.',
  telephone: CONTACT.PHONE_RAW,
  email: CONTACT.EMAIL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ul. Ujejskiego 46a',
    addressLocality: 'Bydgoszcz',
    addressRegion: 'Kujawsko-Pomorskie',
    postalCode: '85-168',
    addressCountry: 'PL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 53.1114435,
    longitude: 18.016832,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '156',
    reviewCount: '140',
  },
  priceRange: '2800-3800 PLN',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '13:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/Qursant/',
    'https://www.instagram.com/qursantlangerrobert/',
    'https://www.google.pl/maps/place/Szkoła+Jazdy+Qursant/@53.1133239,18.0069507,15z',
  ],
  areaServed: [
    {
      '@type': 'City',
      name: 'Bydgoszcz',
    },
    {
      '@type': 'City',
      name: 'Fordon',
    },
    {
      '@type': 'City',
      name: 'Osielsko',
    },
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.qursant.com.pl/#website',
  url: 'https://www.qursant.com.pl',
  name: 'Szkoła Jazdy Qursant Bydgoszcz',
  description:
    'Profesjonalna szkoła jazdy w Bydgoszczy - kursy na prawo jazdy kategorii B',
  publisher: {
    '@id': 'https://www.qursant.com.pl/#organization',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.qursant.com.pl/blog?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'pl-PL',
};

export const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Strona Główna',
      item: 'https://www.qursant.com.pl',
    },
  ],
};
