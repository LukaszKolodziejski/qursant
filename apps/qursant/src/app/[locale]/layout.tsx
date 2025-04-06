import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '../../i18n/settings';
import { Metadata } from 'next';

// Generowanie statycznych parametrów dla wszystkich obsługiwanych języków
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL('https://qursant.pl'),
  title: 'Qursant - Szkoła Jazdy w Bydgoszczy',
  description:
    'Profesjonalna szkoła jazdy w Bydgoszczy. Kursy prawa jazdy, doświadczeni instruktorzy, wysokie wyniki zdawalności.',
  alternates: {
    canonical: '/',
    languages: {
      'x-default': '/',
      pl: '/',
      en: '/en',
      uk: '/uk',
    },
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
    google: 'verification_token',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  // Załaduj tłumaczenia dla danego języka
  const messages = (await import(`../../content/translations/${locale}.json`))
    .default;

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="Europe/Warsaw"
        >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
