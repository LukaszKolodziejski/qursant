import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cennik Kursów - Szkoła Jazdy Qursant Bydgoszcz | Ceny 2025',
  description:
    'Sprawdź aktualne ceny kursów prawa jazdy w Bydgoszczy ➤ Przejrzyste ceny ➤ Możliwość płatności w ratach ➤ Kurs podstawowy i ekspresowy ✓ Konkurencyjne stawki. Bezpłatne materiały dydaktyczne!',
  keywords:
    'cennik prawo jazdy bydgoszcz, cena kursu prawa jazdy bydgoszcz, ile kosztuje prawo jazdy bydgoszcz, szkoła jazdy bydgoszcz ceny, koszt kursu kat b, cena szkoły jazdy',
  alternates: {
    canonical: 'https://www.qursant.com.pl/cennik',
  },
  openGraph: {
    title: 'Cennik Kursów Prawa Jazdy - Szkoła Jazdy Qursant Bydgoszcz',
    description:
      'Aktualne ceny kursów prawa jazdy w Bydgoszczy. Możliwość płatności w ratach. Kurs podstawowy i ekspresowy. Sprawdź nasze konkurencyjne ceny!',
    url: 'https://www.qursant.com.pl/cennik',
    type: 'website',
  },
};

export default function CennikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
