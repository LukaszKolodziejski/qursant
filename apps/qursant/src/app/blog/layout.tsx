import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog i Aktualności - Szkoła Jazdy Qursant Bydgoszcz',
  description:
    'Blog szkoły jazdy w Bydgoszczy ➤ Porady dla kursantów ➤ Aktualności ➤ Jak zdać egzamin ➤ Informacje o nauce jazdy ✓ Sprawdź najnowsze wpisy!',
  keywords:
    'blog szkoła jazdy, porady nauka jazdy, jak zdać egzamin bydgoszcz, aktualności szkoła jazdy, blog qursant',
  alternates: {
    canonical: 'https://www.qursant.com.pl/blog',
  },
  openGraph: {
    title: 'Blog i Aktualności - Szkoła Jazdy Qursant Bydgoszcz',
    description:
      'Blog szkoły jazdy w Bydgoszczy. Porady, aktualności i wszystko o nauce jazdy.',
    url: 'https://www.qursant.com.pl/blog',
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
