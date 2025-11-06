import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pytania i Odpowiedzi - Szkoła Jazdy Qursant Bydgoszcz | FAQ',
  description:
    'Najczęściej zadawane pytania o kurs prawa jazdy w Bydgoszczy ➤ Jak długo trwa kurs? ➤ Jakie wymagania? ➤ Jak wygląda egzamin? ✓ Znajdź odpowiedzi na wszystkie pytania o prawo jazdy kategorii B!',
  keywords:
    'ile trwa kurs prawa jazdy, wymagania prawo jazdy, pytania egzamin prawo jazdy, faq szkoła jazdy, jak zdać egzamin na prawo jazdy bydgoszcz, koszt prawa jazdy',
  alternates: {
    canonical: 'https://www.qursant.com.pl/pytania',
  },
  openGraph: {
    title: 'Często zadawane pytania - Szkoła Jazdy Qursant Bydgoszcz',
    description:
      'Znajdź odpowiedzi na najczęściej zadawane pytania o kurs prawa jazdy w Bydgoszczy. Wszystko o wymaganiach, egzaminach i organizacji kursu.',
    url: 'https://www.qursant.com.pl/pytania',
    type: 'website',
  },
};

export default function PytaniaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
