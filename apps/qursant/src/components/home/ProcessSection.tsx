'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiLightningBolt } from 'react-icons/hi';

export default function ProcessSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 bg-gradient-to-b from-indigo-950 to-purple-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15),transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">
              Zdobądź swoje prawo jazdy
            </span>
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Przeprowadzimy Cię przez cały proces - od kursu teoretycznego po
            egzamin praktyczny
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {[
              {
                step: '01',
                title: 'Kurs teoretyczny',
                description:
                  'Kompleksowe szkolenie z przepisów ruchu drogowego i zasad bezpieczeństwa',
              },
              {
                step: '02',
                title: 'Jazdy praktyczne',
                description:
                  'Nauka prowadzenia pojazdu pod okiem doświadczonych instruktorów',
              },
              {
                step: '03',
                title: 'Egzamin wewnętrzny',
                description:
                  'Przygotowanie do egzaminu państwowego w warunkach zbliżonych do rzeczywistych',
              },
              {
                step: '04',
                title: 'Egzamin państwowy',
                description:
                  'Wsparcie podczas egzaminu i wysoka zdawalność dzięki naszemu przygotowaniu',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="flex space-x-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0">
                  <div className="relative h-12 w-12">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 blur-md opacity-80"></div>
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-full bg-purple-900 border border-purple-400">
                      <span className="text-lg font-bold text-white">
                        {step.step}
                      </span>
                    </div>
                  </div>
                  {index < 3 && (
                    <div className="w-0.5 h-16 bg-gradient-to-b from-purple-500 to-blue-500 ml-6 mt-2"></div>
                  )}
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-blue-200">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="relative w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/images/cars/photo-78.jpg"
              alt="Prawo jazdy"
              width={800}
              height={600}
              className="w-full h-auto rounded-2xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-transparent rounded-2xl"></div>

            <div className="absolute bottom-6 right-6 z-10">
              <motion.div
                className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="font-medium">Wysokie 95% zdawalności</span>
                <HiLightningBolt className="text-yellow-300" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 text-center relative z-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link
            href="/rezerwacja"
            className="group inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          >
            <span>Zapisz się na kurs</span>
            <svg
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
