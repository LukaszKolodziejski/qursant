'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero section */}
      <section className="relative bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              {t('title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('subtitle')}
            </p>
            <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
              {t('description')}
            </p>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              <div className="flex flex-col items-center">
                <dt className="text-4xl font-bold text-primary">1000+</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-400">
                  {t('stats.students')}
                </dd>
              </div>
              <div className="flex flex-col items-center">
                <dt className="text-4xl font-bold text-primary">15+</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-400">
                  {t('stats.experience')}
                </dd>
              </div>
              <div className="flex flex-col items-center">
                <dt className="text-4xl font-bold text-primary">10+</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-400">
                  {t('stats.instructors')}
                </dd>
              </div>
              <div className="flex flex-col items-center">
                <dt className="text-4xl font-bold text-primary">95%</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-400">
                  {t('stats.passRate')}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
