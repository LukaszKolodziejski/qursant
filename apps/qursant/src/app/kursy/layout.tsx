import type { Metadata } from 'next';
import { buildMeta } from '@/lib/meta';

export const metadata: Metadata = buildMeta({
  intent: 'informational',
  title: 'Kursy prawa jazdy kat. B w Bydgoszczy – Qursant',
  description:
    'Kursy prawa jazdy kategorii B w Qursant: 30h teorii + 30h praktyki, elastyczne terminy, nowoczesne auta i wysoka zdawalność. Sprawdź harmonogram i zapisz się.',
  path: '/kursy',
});

export default function KursyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
