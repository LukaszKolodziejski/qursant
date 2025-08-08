import type { Metadata } from 'next';
import { buildMeta } from '@/lib/meta';

export const metadata: Metadata = buildMeta({
  intent: 'informational',
  title: 'Galeria – samochody, instruktorzy i szkoła | Qursant',
  description:
    'Zobacz galerię Szkoły Jazdy Qursant: nowoczesna flota, sala wykładowa oraz zespół instruktorów. Poznaj naszą szkołę przed zapisem na kurs.',
  path: '/galeria',
});

export default function GaleriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
