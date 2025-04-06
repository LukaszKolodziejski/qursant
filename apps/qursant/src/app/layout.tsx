import './globals.css';

export const metadata = {
  title: 'Qursant - Szkoła Jazdy w Bydgoszczy',
  description:
    'Profesjonalna szkoła jazdy w Bydgoszczy. Kursy prawa jazdy, doświadczeni instruktorzy, wysokie wyniki zdawalności.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
