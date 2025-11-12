// ===================================================================
// SERVER COMPONENT - SEO OPTIMIZED!
// ===================================================================
// Strona kontaktu jako Server Component - lepsze SEO!
// Wszystkie animacje i mapa w KontaktContent (Client child)
// ===================================================================

import { Metadata } from 'next';
import KontaktContent from '@/components/pages/KontaktContent';
import { CONTACT } from '@/constants/contact';

export const metadata: Metadata = {
  title: 'Kontakt - Szkoła Jazdy Qursant Bydgoszcz | Telefon, Adres, Godziny',
  description:
    'Skontaktuj się ze Szkołą Jazdy Qursant w Bydgoszczy. Telefon: 600 354 556, 668 302 352. Adres: ul. Ujejskiego 46a, Wzgórze Wolności. Odwiedź nas lub zadzwoń!',
  keywords: [
    'kontakt szkoła jazdy bydgoszcz',
    'numer telefonu qursant',
    'adres szkoła jazdy bydgoszcz',
    'godziny otwarcia qursant',
    'gdzie znajduje się qursant',
  ],
  alternates: {
    canonical: 'https://www.qursant.com.pl/kontakt',
  },
  openGraph: {
    title: 'Kontakt - Szkoła Jazdy Qursant Bydgoszcz',
    description:
      'Skontaktuj się ze Szkołą Jazdy Qursant w Bydgoszczy. Telefon: 600 354 556, 668 302 352. Adres: ul. Ujejskiego 46a, Wzgórze Wolności.',
    url: 'https://www.qursant.com.pl/kontakt',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Kontakt - Szkoła Jazdy Qursant Bydgoszcz',
    description:
      'Skontaktuj się ze Szkołą Jazdy Qursant w Bydgoszczy. Telefon: 600 354 556, 668 302 352. Adres: ul. Ujejskiego 46a, Wzgórze Wolności.',
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

export default function KontaktPage() {
  const coordinates = {
    lat: 53.1114435,
    lng: 18.016832,
  };

  // Schema.org - LocalBusiness dla kontaktu
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    name: 'Szkoła Jazdy Qursant',
    image: 'https://www.qursant.com.pl/logo/logo-white.png',
    '@id': 'https://www.qursant.com.pl/kontakt',
    url: 'https://www.qursant.com.pl',
    telephone: CONTACT.PHONE_RAW,
    email: CONTACT.EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Ujejskiego 46a - pawilon',
      addressLocality: 'Bydgoszcz',
      postalCode: '85-168',
      addressCountry: 'PL',
      addressRegion: 'Kujawsko-Pomorskie',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '15:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '11:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/Qursant/',
      'https://www.instagram.com/qursantlangerrobert/',
      'https://www.google.pl/maps/place/Szkoła+Jazdy+Qursant/@53.1133239,18.0069507,15z',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema),
        }}
      />
      <KontaktContent coordinates={coordinates} />
    </>
  );
}
