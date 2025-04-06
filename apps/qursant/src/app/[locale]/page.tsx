'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { generateSchemaOrgMarkup } from '@/lib/seo/schemaMarkup';
import Script from 'next/script';

export default function HomePage() {
  const t = useTranslations('home');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'pl';
  const url = `https://qursant.pl${pathname}`;

  const schemaMarkup = generateSchemaOrgMarkup({
    locale: locale as 'pl' | 'en' | 'uk',
    url,
  });

  return (
    <>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Hero section */}
      <section className="relative bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              {t('title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('subtitle')}
            </p>
            <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
              {t('description')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={`/${locale}/booking`}
                className="rounded-md bg-primary px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors duration-300"
              >
                {t('startLearning')}
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <dt className="text-4xl font-bold text-primary">1000+</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-400">
                  {t('stats.students')}
                </dd>
              </motion.div>
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <dt className="text-4xl font-bold text-primary">15+</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-400">
                  {t('stats.experience')}
                </dd>
              </motion.div>
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <dt className="text-4xl font-bold text-primary">10+</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-400">
                  {t('stats.instructors')}
                </dd>
              </motion.div>
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <dt className="text-4xl font-bold text-primary">95%</dt>
                <dd className="mt-2 text-base text-gray-600 dark:text-gray-400">
                  {t('stats.passRate')}
                </dd>
              </motion.div>
            </dl>
          </motion.div>
        </div>
      </section>

      {/* Why Us section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {t('whyUs.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('whyUs.subtitle')}
            </p>
          </motion.div>
          <motion.div
            className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  className="flex flex-col items-start"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="rounded-md bg-primary/10 p-3 ring-1 ring-primary/20">
                    <div className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <dt className="mt-4 font-semibold text-gray-900 dark:text-white">
                    {t(`whyUs.reasons.${item}.title`)}
                  </dt>
                  <dd className="mt-2 leading-7 text-gray-600 dark:text-gray-400">
                    {t(`whyUs.reasons.${item}.description`)}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>
    </>
  );
}
