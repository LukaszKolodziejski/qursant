import './globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.qursant.com.pl'),
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
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow [&:not(:has(>:first-child[data-homepage]))]:pt-14 [&:not(:has(>:first-child[data-homepage]))]:sm:pt-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
