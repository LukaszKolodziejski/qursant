import './globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://qursant.pl'),
  title: {
    template: '%s | Qursant',
    default: 'Qursant - Szkoła Jazdy w Bydgoszczy',
  },
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

type Props = {
  children: React.ReactNode;
  params?: { locale: string };
};

export default function RootLayout({ children, params }: Props) {
  const locale = params?.locale || 'pl';

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-white dark:bg-gray-900`}>
        {children}
      </body>
    </html>
  );
}
