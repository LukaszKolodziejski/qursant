'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import Script from 'next/script';

export default function AboutPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Script id="schema-org" type="application/ld+json" />

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
              Qursant
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Qursant to nowoczesna szkoła jazdy, która oferuje kursy na prawo
              jazdy kategorii A, B, C i D. Doświadczeni instruktorzy, wysokie
              wyniki zdawalności.
            </p>
            <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
              Qursant to nowoczesna szkoła jazdy, która oferuje kursy na prawo
              jazdy kategorii A, B, C i D. Doświadczeni instruktorzy, wysokie
              wyniki zdawalności.
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
              Nasza misja
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Nasza misja to zapewnienie najwyższej jakości kursów jazdy i
              wspomagania w procesie nauki.
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
              Nasze wartości
            </h2>
          </motion.div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {Object.entries([
              {
                title: 'Bezpieczeństwo',
                description:
                  'Bezpieczeństwo to nasza najważniejsza wartość. Zapewniamy bezpieczne i bezpieczne warunki nauki.',
              },
              {
                title: 'Profesjonalizm',
                description:
                  'Profesjonalizm to nasza najważniejsza wartość. Zapewniamy profesjonalne i profesjonalne warunki nauki.',
              },
              {
                title: 'Innowacja',
                description:
                  'Innowacja to nasza najważniejsza wartość. Zapewniamy innowacyjne i innowacyjne warunki nauki.',
              },
            ]).map(([key, value]: [string, any], index) => (
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
            ))}
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
              Nasz zespół
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Nasz zespół to zespół doświadczonych instruktorów, którzy
              zapewniają najwyższą jakość kursów jazdy.
            </p>
          </motion.div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {Object.entries([
              {
                name: 'Jan Kowalski',
                role: 'Instruktor',
                description:
                  'Jan Kowalski to instruktor z wieloletnim doświadczeniem. Zapewnia najwyższą jakość kursów jazdy.',
              },
              {
                name: 'Anna Nowak',
                role: 'Instruktor',
                description:
                  'Anna Nowak to instruktor z wieloletnim doświadczeniem. Zapewnia najwyższą jakość kursów jazdy.',
              },
              {
                name: 'Piotr Wiśniewski',
                role: 'Instruktor',
                description:
                  'Piotr Wiśniewski to instruktor z wieloletnim doświadczeniem. Zapewnia najwyższą jakość kursów jazdy.',
              },
            ]).map(([key, value]: [string, any], index: number) => (
              <motion.div
                key={value.name}
                className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="relative h-64">
                  <Image
                    src={value.image}
                    alt={value.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="px-6 py-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {value.name}
                  </h3>
                  <p className="mt-1 text-sm text-primary">{value.role}</p>
                  <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
                    {value.description}
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
              Nasze statystyki
            </h2>
          </motion.div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-4">
            {Object.entries([
              { value: 100, label: 'Kursów jazdy' },
              { value: 100, label: 'Kursów jazdy' },
              { value: 100, label: 'Kursów jazdy' },
              { value: 100, label: 'Kursów jazdy' },
            ]).map(([key, value]: [string, any], index) => (
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
