'use client';

import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('common');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-4 text-center">{t('navigation.home')}</h1>
      <p className="text-center">Witamy w szkole jazdy Qursant!</p>
    </main>
  );
}
