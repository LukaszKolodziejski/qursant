import './globals.css';
import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const viewport: Viewport = {
  themeColor: '#3b82f6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.qursant.com.pl'),
  title: {
    template: '%s | Szkoła Jazdy Qursant Bydgoszcz',
    default: 'Szkoła Jazdy Qursant Bydgoszcz - Prawo Jazdy Kategorii B',
  },
  description:
    'Profesjonalna szkoła jazdy w Bydgoszczy ➤ Doświadczeni instruktorzy ➤ Nowoczesne samochody ✓ Zapisz się na kurs prawa jazdy już dziś! Elastyczne terminy, konkurencyjne ceny.',
  keywords:
    'szkoła jazdy, szkoła jazdy bydgoszcz, prawo jazdy, prawo jazdy bydgoszcz, kurs prawa jazdy, kurs prawa jazdy bydgoszcz,nauka jazdy, nauka jazdy bydgoszcz, kurs na prawo jazdy, instruktor bydgoszcz, egzamin prawo jazdy bydgoszcz, kategoria b bydgoszcz, ośrodek szkolenia kierowców bydgoszcz, osk bydgoszcz',
  alternates: {
    canonical: 'https://www.qursant.com.pl',
    languages: {
      'x-default': 'https://www.qursant.com.pl',
      pl: 'https://www.qursant.com.pl',
    },
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Szkoła Jazdy Qursant',
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://www.qursant.com.pl',
    siteName: 'Szkoła Jazdy Qursant Bydgoszcz',
    title: 'Szkoła Jazdy Qursant Bydgoszcz - Prawo Jazdy Kategorii B',
    description:
      'Profesjonalna szkoła jazdy w Bydgoszczy ➤ 95% zdawalność ➤ Doświadczeni instruktorzy ➤ Nowoczesne samochody ✓ Zapisz się na kurs prawa jazdy już dziś!',
    images: [
      {
        url: 'https://www.qursant.com.pl/images/instructors/photo-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Szkoła Jazdy Qursant Bydgoszcz',
      },
    ],
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
  verification: {
    google: '3MjVR8wLcqMo3Ft46oL8xIPPT7ZG9O7H9l78xO2gtgs',
  },
  authors: [{ name: 'Qursant' }],
  creator: 'Qursant',
  publisher: 'Qursant',
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  category: 'driving school',
  other: {
    'geo.position': '53.1133239;18.0069507',
    'geo.placename': 'Bydgoszcz',
    'geo.region': 'PL-KP',
    ICBM: '53.1133239, 18.0069507',
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pl" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'DrivingSchool',
              name: 'Szkoła Jazdy Qursant',
              image: 'https://www.qursant.com.pl/logo/logo-white.png',
              '@id': 'https://www.qursant.com.pl',
              url: 'https://www.qursant.com.pl',
              telephone: '+48600354556',
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
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                bestRating: '5',
                worstRating: '1',
                ratingCount: '156',
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                  ],
                  opens: '09:00',
                  closes: '17:00',
                },
              ],
              sameAs: [
                'https://www.facebook.com/Qursant/',
                'https://www.instagram.com/qursantlangerrobert/',
                'https://www.google.pl/maps/place/Szkoła+Jazdy+Qursant/@53.1133239,18.0069507,15z',
              ],
            }),
          }}
        />
        <meta
          name="google-site-verification"
          content="3MjVR8wLcqMo3Ft46oL8xIPPT7ZG9O7H9l78xO2gtgs"
        />
      </head>
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 flex flex-col min-h-screen`}
      >
        <Navbar />
        <main
          className={`flex-grow [&:not(:has(>:first-child[data-homepage]))]:pt-14 [&:not(:has(>:first-child[data-homepage]))]:sm:pt-14`}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
