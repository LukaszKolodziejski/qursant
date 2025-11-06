import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kursy Prawa Jazdy Kat. B - Szkoła Jazdy Qursant Bydgoszcz',
  description:
    'Profesjonalne kursy na prawo jazdy kategorii B w Bydgoszczy ➤ Kurs podstawowy i ekspresowy ➤ Elastyczne terminy ➤ Doświadczeni instruktorzy ✓ Zajęcia teoretyczne i praktyczne. Najbliższy kurs już wkrótce!',
  keywords:
    'kurs prawa jazdy bydgoszcz, kurs na prawo jazdy, szkoła jazdy bydgoszcz kursy, nauka jazdy bydgoszcz, zajęcia praktyczne, zajęcia teoretyczne, instruktor nauki jazdy, kurs kat b bydgoszcz',
  alternates: {
    canonical: 'https://www.qursant.com.pl/kursy',
  },
  openGraph: {
    title: 'Kursy Prawa Jazdy Kat. B - Szkoła Jazdy Qursant Bydgoszcz',
    description:
      'Profesjonalne kursy na prawo jazdy kategorii B w Bydgoszczy. Kurs podstawowy i ekspresowy. Elastyczne terminy, doświadczeni instruktorzy.',
    url: 'https://www.qursant.com.pl/kursy',
    type: 'website',
    images: [
      {
        url: 'https://www.qursant.com.pl/images/course/photo-3.jpg',
        width: 1200,
        height: 630,
        alt: 'Kursy prawa jazdy Qursant Bydgoszcz',
      },
    ],
  },
};

export default function KursyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
