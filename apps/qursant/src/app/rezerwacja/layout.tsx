import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Rezerwacja Kursu - Szkoła Jazdy Qursant Bydgoszcz | Zapisz się online',
  description:
    'Zarezerwuj miejsce na kursie prawa jazdy w Bydgoszczy ➤ Prosty formularz online ➤ Szybka odpowiedź ➤ Elastyczne terminy ✓ Ograniczona liczba miejsc - zapisz się już dziś!',
  keywords:
    'rezerwacja kurs prawa jazdy bydgoszcz, zapis na kurs prawa jazdy, zapisz się szkoła jazdy bydgoszcz, wolne miejsca kurs prawa jazdy, formularz rezerwacji prawo jazdy',
  alternates: {
    canonical: 'https://www.qursant.com.pl/rezerwacja',
  },
  openGraph: {
    title: 'Rezerwacja Kursu - Szkoła Jazdy Qursant Bydgoszcz',
    description:
      'Zarezerwuj miejsce na kursie prawa jazdy w Bydgoszczy. Prosty formularz, szybka odpowiedź, elastyczne terminy. Ograniczona liczba miejsc!',
    url: 'https://www.qursant.com.pl/rezerwacja',
    type: 'website',
  },
};

export default function RezerwacjaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
