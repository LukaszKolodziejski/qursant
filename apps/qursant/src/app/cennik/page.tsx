'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineAcademicCap,
  HiLightningBolt,
  HiOutlineCheck,
  HiOutlineGift,
  HiOutlineCreditCard,
} from 'react-icons/hi';
import { FaCar, FaGraduationCap, FaMedal, FaRegClock } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function CennikPage() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const months = [
      'Styczeń',
      'Luty',
      'Marzec',
      'Kwiecień',
      'Maj',
      'Czerwiec',
      'Lipiec',
      'Sierpień',
      'Wrzesień',
      'Październik',
      'Listopad',
      'Grudzień',
    ];
    setCurrentDate(`${months[date.getMonth()]} ${date.getFullYear()}`);
  }, []);

  // Animacje
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const pulseAnimation = {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="mb-6">
              <motion.span
                className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-300 text-sm font-medium"
                animate={pulseAnimation}
              >
                Aktualne ceny: {currentDate}
              </motion.span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                Cennik kursów
              </span>
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Przejrzyste ceny i elastyczne formy płatności
            </p>
          </motion.div>

          {/* Główne pakiety */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Kurs Podstawowy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20"
            >
              <div className="absolute -top-4 left-4">
                <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Popularny wybór
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Kurs Podstawowy
              </h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-blue-300">
                  3200 zł
                </span>
                <span className="text-blue-200 ml-2">/ kurs</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-blue-200">
                  <HiOutlineCheck className="text-emerald-400 mr-2" />
                  2-3 jazdy w tygodniu
                </li>
                <li className="flex items-center text-blue-200">
                  <HiOutlineCheck className="text-emerald-400 mr-2" />
                  Teoria stacjonarnie lub E-learning
                </li>
                <li className="flex items-center text-blue-200">
                  <HiOutlineCheck className="text-emerald-400 mr-2" />
                  Elastyczny harmonogram
                </li>
              </ul>
              <Link
                href="/booking"
                className="block text-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Zapisz się na kurs
              </Link>
            </motion.div>

            {/* Kurs Ekspresowy */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20"
            >
              <div className="absolute -top-4 left-4">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Szybka realizacja
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Kurs Ekspresowy
              </h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-yellow-300">
                  4000 zł
                </span>
                <span className="text-blue-200 ml-2">/ kurs</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-blue-200">
                  <HiOutlineCheck className="text-emerald-400 mr-2" />
                  5-7 jazd w tygodniu
                </li>
                <li className="flex items-center text-blue-200">
                  <HiOutlineCheck className="text-emerald-400 mr-2" />
                  Szybsze ukończenie kursu
                </li>
                <li className="flex items-center text-blue-200">
                  <HiOutlineCheck className="text-emerald-400 mr-2" />
                  Intensywne szkolenie
                </li>
              </ul>
              <Link
                href="/booking"
                className="block text-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Wybierz kurs ekspresowy
              </Link>
            </motion.div>
          </div>

          {/* Bonusy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 max-w-3xl mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-green-500/20"
          >
            <div className="flex items-center justify-center text-emerald-400 mb-4">
              <HiOutlineGift className="text-3xl" />
              <h3 className="text-xl font-semibold ml-2">Otrzymujesz gratis</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-blue-200">
                <HiOutlineCheck className="text-emerald-400 mr-2" />
                Komplet materiałów dydaktycznych
              </div>
              <div className="flex items-center text-blue-200">
                <HiOutlineCheck className="text-emerald-400 mr-2" />
                Egzaminy wewnętrzne
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Raty i płatności */}
      <section className="relative py-24 bg-gradient-to-b from-purple-950 to-indigo-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
                Elastyczne formy płatności
              </span>
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Możliwość rozłożenia płatności na 5 wygodnych rat
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: 'I rata',
                  amount: '600 zł',
                  desc: 'Zajęcia teoretyczne',
                },
                {
                  step: 'II rata',
                  amount: '600 zł',
                  desc: 'Przed pierwszą jazdą',
                },
                {
                  step: 'III rata',
                  amount: '600 zł',
                  desc: 'Po 10 godz. jazdy',
                },
                {
                  step: 'IV rata',
                  amount: '700 zł',
                  desc: 'Po 16 godz. jazdy',
                },
                { step: 'V rata', amount: '700 zł', desc: 'Po 24 godz. jazdy' },
              ].map((rata, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
                >
                  <div className="text-center">
                    <span className="text-sm font-medium text-purple-300">
                      {rata.step}
                    </span>
                    <p className="text-2xl font-bold text-white my-2">
                      {rata.amount}
                    </p>
                    <p className="text-blue-200 text-sm">{rata.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <p className="text-blue-200 mb-4">Numer konta do płatności:</p>
              <p className="text-xl font-mono text-white bg-white/5 rounded-lg py-3 px-6 inline-block">
                ING 84 1050 1139 1000 0090 8455 3669
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dodatkowe usługi */}
      <section className="relative py-24 bg-gradient-to-b from-indigo-950 to-blue-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
                Usługi dodatkowe
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Doszkalanie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <FaCar className="text-2xl text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Doszkalanie
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-blue-200">
                  <HiOutlineCheck className="text-emerald-400 mr-2" />
                  100 zł/godz. - nasi kursanci
                </li>
                <li className="flex items-center text-blue-200">
                  <HiOutlineCheck className="text-emerald-400 mr-2" />
                  110 zł/godz. - pozostali
                </li>
              </ul>
            </motion.div>

            {/* Badania lekarskie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <HiOutlineDocumentText className="text-2xl text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Badania lekarskie
                </h3>
              </div>
              <p className="text-2xl font-bold text-white mb-2">200 zł</p>
              <p className="text-blue-200">Badania na miejscu w szkole jazdy</p>
            </motion.div>

            {/* Dodatkowe informacje */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <HiOutlineAcademicCap className="text-2xl text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Dla zamiejscowych
                </h3>
              </div>
              <p className="text-blue-200">
                Możliwość rozpoczęcia i zakończenia jazd z PKS-u przy ul.
                Jagiellońskiej
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-b from-blue-950 to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              animate={pulseAnimation}
              className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 text-orange-300 text-sm font-medium mb-6"
            >
              Liczba miejsc ograniczona!
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Zarezerwuj swoje miejsce już dziś!
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium text-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Zapisz się na kurs
                <HiLightningBolt className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
