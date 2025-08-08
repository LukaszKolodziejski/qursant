import type { Metadata } from 'next';
import { buildMeta } from '@/lib/meta';

export const metadata: Metadata = buildMeta({
  intent: 'transactional',
  title: 'Rezerwacja kursu prawa jazdy – zapisz się online | Qursant',
  description:
    'Zarezerwuj miejsce na kurs prawa jazdy kat. B w Bydgoszczy. Szybki formularz online, elastyczne terminy i wsparcie instruktora na każdym etapie.',
  path: '/rezerwacja',
});

export default function RezerwacjaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
