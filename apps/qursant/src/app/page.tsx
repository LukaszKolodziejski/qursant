import { Metadata } from 'next';
import { Locale } from '../i18n/settings';

type QursantMetadata = Omit<Metadata, 'alternates'> & {
  alternates: {
    canonical: string;
    languages: Partial<Record<Locale, string>>;
  };
};

export const metadata: QursantMetadata = {
  title: 'Qursant - Szkoła Jazdy w Bydgoszczy | Driving School',
  description:
    'Profesjonalna szkoła jazdy w Bydgoszczy. Kursy prawa jazdy, doświadczeni instruktorzy, wysokie wyniki zdawalności. Professional driving school in Bydgoszcz, Poland.',
  alternates: {
    canonical: '/',
    languages: {
      pl: '/',
      en: '/en',
      ua: '/ua',
    },
  },
  keywords: [
    // Polski
    'Szkoła jazdy Bydgoszcz',
    'Kurs prawa jazdy Bydgoszcz',
    'Nauka jazdy',
    'Egzamin na prawo jazdy',
    'Najlepsza szkoła jazdy',
    'Qursant',
    // English
    'Driving school Bydgoszcz',
    'Driving lessons Bydgoszcz',
    'Driving license Poland',
    'Best driving school',
    // Ukrainian
    'Автошкола Бидгощ',
    'Водійські курси Польща',
  ],
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
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    alternateLocale: ['en_GB', 'uk_UA'],
    url: 'https://qursant.pl',
    siteName: 'Qursant - Szkoła Jazdy',
    images: [
      {
        url: '/og/home.jpg',
        width: 1200,
        height: 630,
        alt: 'Qursant - Szkoła Jazdy w Bydgoszczy',
      },
    ],
  },
} satisfies QursantMetadata;

export default async function HomePage() {
  const messages = (await import('../content/translations/pl.json')).default;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-4">
        {messages.common.navigation.home}
      </h1>
      <p className="text-lg text-center max-w-2xl">
        {messages.meta.description}
      </p>
      {/* Schema.org markup dla wyszukiwarek */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Qursant',
            description: 'Profesjonalna szkoła jazdy w Bydgoszczy',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Bydgoszcz',
              addressCountry: 'PL',
            },
            url: 'https://qursant.pl',
            sameAs: [
              'https://www.facebook.com/qursant',
              'https://instagram.com/qursant',
            ],
            teaches: ['Kurs prawa jazdy', 'Driving lessons', 'Водійські курси'],
          }),
        }}
      />
    </main>
  );
}
