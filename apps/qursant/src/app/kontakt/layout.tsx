import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt - Szkoła Jazdy Qursant Bydgoszcz | ul. Ujejskiego 46a',
  description:
    'Skontaktuj się z nami ➤ Szkoła Jazdy Qursant Bydgoszcz, ul. Ujejskiego 46a ☎ 600 354 556, 668 302 352 ✉ langer.biuro@poczta.fm ✓ Godziny otwarcia: Pon-Pt 15-17, Sob 9-11. Odwiedź nas!',
  keywords:
    'kontakt szkoła jazdy bydgoszcz, szkoła jazdy qursant adres, instruktor nauki jazdy bydgoszcz telefon, ujejskiego 46a bydgoszcz, szkoła jazdy bydgoszcz numer telefonu',
  alternates: {
    canonical: 'https://www.qursant.com.pl/kontakt',
  },
  openGraph: {
    title: 'Kontakt - Szkoła Jazdy Qursant Bydgoszcz',
    description:
      'Skontaktuj się z nami. Szkoła Jazdy Qursant, ul. Ujejskiego 46a, Bydgoszcz. Tel: 600 354 556, 668 302 352',
    url: 'https://www.qursant.com.pl/kontakt',
    type: 'website',
  },
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
