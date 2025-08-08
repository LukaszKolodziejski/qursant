import type { Metadata } from 'next';
import { buildMeta } from '@/lib/meta';

export const metadata: Metadata = buildMeta({
  intent: 'comparative',
  title: 'Cennik kursów prawa jazdy kat. B – ceny i raty | Qursant',
  description:
    'Aktualny cennik kursów prawa jazdy kat. B w Qursant: kurs podstawowy i ekspresowy, możliwość płatności w 5 ratach, przejrzyste zasady bez ukrytych kosztów.',
  path: '/cennik',
});

export default function CennikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
