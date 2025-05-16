'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { generateSchemaOrgMarkup } from '@/lib/seo/schemaMarkup';
import Script from 'next/script';

export default function AboutPage() {
  const t = useTranslations('about');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'pl';
  const url = `https://qursant.pl${pathname}`;

  const schemaMarkup = generateSchemaOrgMarkup({
    locale: locale as 'pl' | 'en' | 'uk',
    url,
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
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
          </motion.div>
        </div>
      </section>

      {/* Mission section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {t('mission.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('mission.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values section */}
      <section className="bg-white dark:bg-gray-900 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center mb-16"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {t('values.title')}
            </h2>
          </motion.div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {Object.entries(t.raw('values.list')).map(
              ([key, value]: [string, any], index) => (
                <motion.div
                  key={key}
                  className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeInUp}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="px-6 py-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {value.title}
                    </h3>
                    <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center mb-16"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {t('team.title')}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {t('team.description')}
            </p>
          </motion.div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {t.raw('team.members').map((member: any, index: number) => (
              <motion.div
                key={member.name}
                className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="px-6 py-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-primary">{member.role}</p>
                  <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="bg-white dark:bg-gray-900 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center mb-16"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {t('stats.title')}
            </h2>
          </motion.div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-4">
            {Object.entries(t.raw('stats.items')).map(
              ([key, value]: [string, any], index) => (
                <motion.div
                  key={key}
                  className="text-center"
                  initial="hidden"
                  whileInView="visible"
                  variants={fadeInUp}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="text-4xl font-bold text-primary">
                    {value.value}
                  </div>
                  <div className="mt-2 text-base text-gray-500 dark:text-gray-400">
                    {value.label}
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}
