import type { Metadata } from 'next';
import { buildMeta } from '@/lib/meta';

export const metadata: Metadata = buildMeta({
  intent: 'informational',
  title: 'FAQ – najczęstsze pytania o kurs kat. B | Qursant',
  description:
    'Odpowiedzi na najczęściej zadawane pytania o kurs prawa jazdy kat. B: czas trwania, wymagania, egzaminy i koszty. Masz inne pytanie? Skontaktuj się z nami.',
  path: '/pytania',
});

export default function PytaniaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
