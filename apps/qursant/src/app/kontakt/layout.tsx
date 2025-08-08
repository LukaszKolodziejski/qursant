import type { Metadata } from 'next';
import { buildMeta } from '@/lib/meta';

export const metadata: Metadata = buildMeta({
  intent: 'local',
  title: 'Kontakt – Szkoła Jazdy Qursant Bydgoszcz (adres, telefon)',
  description:
    'Skontaktuj się ze Szkołą Jazdy Qursant: adres ul. Ujejskiego 46a w Bydgoszczy, numery telefonów i godziny otwarcia. Kliknij, aby otworzyć nawigację.',
  path: '/kontakt',
});

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
