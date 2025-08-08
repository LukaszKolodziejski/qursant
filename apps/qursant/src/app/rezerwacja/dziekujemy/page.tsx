'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { gaEvent } from '@/lib/ga';

export default function DziekujemyPage() {
  useEffect(() => {
    gaEvent('page_view', { page_path: '/rezerwacja/dziekujemy' });
    gaEvent('conversion', { page_path: '/rezerwacja/dziekujemy' });
  }, []);

  return (
    <section className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Dziękujemy za rezerwację!</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Twoja wiadomość została wysłana. Skontaktujemy się z Tobą, aby
          potwierdzić szczegóły kursu.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700"
        >
          Wróć na stronę główną
        </Link>
      </div>
    </section>
  );
}
