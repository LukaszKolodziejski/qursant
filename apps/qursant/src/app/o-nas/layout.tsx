import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O Nas - Szkoła Jazdy Qursant Bydgoszcz | Od 2009 roku',
  description:
    'Poznaj szkołę jazdy Qursant w Bydgoszczy ➤ Od 2009 roku kształcimy najlepszych kierowców ➤ Doświadczeni instruktorzy ➤ Nowoczesna flota ✓ 15+ lat doświadczenia, 3500+ zadowolonych kursantów.',
  keywords:
    'szkoła jazdy bydgoszcz qursant, o szkole jazdy, najlepsza szkoła jazdy bydgoszcz, instruktorzy bydgoszcz, Robert Langer instruktor, ośrodek szkolenia kierowców',
  alternates: {
    canonical: 'https://www.qursant.com.pl/o-nas',
  },
  openGraph: {
    title: 'O Nas - Szkoła Jazdy Qursant Bydgoszcz',
    description:
      'Od 2009 roku kształcimy najlepszych kierowców w Bydgoszczy. Poznaj nasz zespół doświadczonych instruktorów i nowoczesną flotę pojazdów.',
    url: 'https://www.qursant.com.pl/o-nas',
    type: 'website',
    images: [
      {
        url: 'https://www.qursant.com.pl/images/boss/photo-27.jpg',
        width: 1200,
        height: 630,
        alt: 'Szkoła Jazdy Qursant Bydgoszcz - Zespół',
      },
    ],
  },
};

export default function ONasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
