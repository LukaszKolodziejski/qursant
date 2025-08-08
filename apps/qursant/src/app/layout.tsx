import './globals.css';
import { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { initConsentDefaults } from '@/lib/ga';
export { reportWebVitals } from '@/lib/web-vitals';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/nav/Breadcrumbs';
import EventBindings from '@/components/analytics/EventBindings';
import { CONTACT } from '@/constants/contact';

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
    canonical: '/',
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
        {process.env.NEXT_PUBLIC_GA4_ID ? (
          <>
            <Script id="ga4-consent-default" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date());`}
            </Script>
            <Script
              id="ga4-script"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
            />
            <Script id="ga4-config" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'DrivingSchool',
              '@id': 'https://www.qursant.com.pl',
              url: 'https://www.qursant.com.pl',
              name: 'Szkoła Jazdy Qursant',
              image: 'https://www.qursant.com.pl/logo/logo-white.png',
              telephone: `+48${CONTACT.PHONE_RAW}`,
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
                  opens: '15:00',
                  closes: '17:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Saturday'],
                  opens: '09:00',
                  closes: '11:00',
                },
              ],
              sameAs: [
                CONTACT.SOCIAL_MEDIA.FACEBOOK,
                CONTACT.SOCIAL_MEDIA.INSTAGRAM,
                'https://www.google.pl/maps/place/Szkoła+Jazdy+Qursant/@53.1133239,18.0069507,15z',
              ],
              hasMap:
                'https://www.google.pl/maps/place/Szkoła+Jazdy+Qursant/@53.1133239,18.0069507,15z',
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
        {/* Init consent defaults client-side once */}
        <Script id="ga4-consent-init" strategy="afterInteractive">
          {`try{(${initConsentDefaults.toString()})();}catch(e){}`}
        </Script>
        <Navbar />
        <Breadcrumbs />
        <main
          className={`flex-grow [&:not(:has(>:first-child[data-homepage]))]:pt-14 [&:not(:has(>:first-child[data-homepage]))]:sm:pt-14`}
        >
          {children}
        </main>
        <EventBindings />
        <Footer />
      </body>
    </html>
  );
}
