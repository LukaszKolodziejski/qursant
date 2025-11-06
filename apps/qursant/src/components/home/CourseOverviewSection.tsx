'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { FaCar, FaMedal } from 'react-icons/fa';

export default function CourseOverviewSection() {
  return (
    <section className="bg-gradient-to-b from-purple-950 to-indigo-950 py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.1),transparent_70%)]"></div>
        <div className="absolute -right-40 top-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-40 bottom-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            <Link
              href="/cennik"
              className="hover:opacity-80 transition-opacity duration-300"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-300">
                Kurs prawa jazdy kategorii B
              </span>
            </Link>
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Profesjonalne szkolenie na samochód osobowy z doświadczonymi
            instruktorami
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <HiOutlineAcademicCap className="w-8 h-8" />,
              title: 'Teoria',
              description:
                '30 godzin lekcyjnych z wykorzystaniem nowoczesnych materiałów szkoleniowych',
              color: 'from-blue-500 to-cyan-500',
            },
            {
              icon: <FaCar className="w-8 h-8" />,
              title: 'Praktyka',
              description:
                '30 godzin jazd praktycznych na nowoczesnych samochodach z podwójną kontrolą',
              color: 'from-purple-500 to-pink-500',
            },
            {
              icon: <FaMedal className="w-8 h-8" />,
              title: 'Egzamin',
              description:
                'Przygotowanie do egzaminu państwowego z wysoką zdawalnością',
              color: 'from-yellow-500 to-orange-500',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-8 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="absolute -top-4 -right-4">
                <div
                  className={`w-24 h-24 rounded-full bg-gradient-to-br ${feature.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300`}
                ></div>
              </div>

              <div
                className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-6`}
              >
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-blue-200 mb-6">{feature.description}</p>

              <motion.div
                className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/cennik"
            className="group relative overflow-hidden rounded-full backdrop-blur-md bg-white/10 border border-white/20 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <span className="relative z-10">Zobacz kursy</span>
            <motion.span
              className="absolute inset-0 bg-white/20 z-0"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
