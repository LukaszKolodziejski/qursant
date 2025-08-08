import type { Metadata } from 'next';
import { buildMeta } from '@/lib/meta';

export const metadata: Metadata = buildMeta({
  intent: 'informational',
  title: 'O nas – Szkoła Jazdy Qursant w Bydgoszczy',
  description:
    'Poznaj Szkołę Jazdy Qursant: doświadczonych instruktorów, nowoczesną flotę i wartości, które stoją za naszą wysoką zdawalnością w Bydgoszczy.',
  path: '/o-nas',
});

export default function ONasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
