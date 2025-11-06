import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galeria - Szkoła Jazdy Qursant Bydgoszcz | Zdjęcia naszej szkoły',
  description:
    'Zobacz zdjęcia naszej szkoły jazdy w Bydgoszczy ➤ Nowoczesne samochody Opel Corsa 2024 ➤ Doświadczeni instruktorzy ➤ Klimatyzowana sala wykładowa ✓ Poznaj naszą szkołę i flotę pojazdów!',
  keywords:
    'galeria szkoła jazdy bydgoszcz, zdjęcia samochody szkoleniowe, opel corsa szkoła jazdy, instruktorzy zdjęcia, siedziba szkoły jazdy bydgoszcz',
  alternates: {
    canonical: 'https://www.qursant.com.pl/galeria',
  },
  openGraph: {
    title: 'Galeria - Szkoła Jazdy Qursant Bydgoszcz',
    description:
      'Zobacz zdjęcia naszej szkoły jazdy, nowoczesnych samochodów i doświadczonych instruktorów w Bydgoszczy.',
    url: 'https://www.qursant.com.pl/galeria',
    type: 'website',
    images: [
      {
        url: 'https://www.qursant.com.pl/images/cars/photo-78.jpg',
        width: 1200,
        height: 630,
        alt: 'Samochody szkoleniowe Szkoła Jazdy Qursant Bydgoszcz',
      },
    ],
  },
};

export default function GaleriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
