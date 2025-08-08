'use client';

import { motion } from 'framer-motion';
import {
  HiOutlineDocumentText,
  HiOutlineAcademicCap,
  HiOutlineCheck,
  HiOutlineGift,
} from 'react-icons/hi';
import { FaCar } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { CONTACT } from '@/constants/contact';
import FaqSection from '@/components/seo/FaqSection';
import { PRICES } from '@/constants/prices';
import AnswerBox from '@/components/seo/AnswerBox';
import IntentCta from '@/components/seo/IntentCta';
import SuggestedLinks from '@/components/seo/SuggestedLinks';

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
      <section className="bg-gradient-to-b from-indigo-950 to-blue-950 py-8">
        <div className="container mx-auto px-6">
          <AnswerBox
            title="Jakie są ceny kursów prawa jazdy w Qursant?"
            text={`Kurs podstawowy kosztuje ${PRICES.COURSE.BASIC} zł, a ekspresowy ${PRICES.COURSE.EXPRESS} zł. Oferujemy możliwość płatności w 5 ratach bez dodatkowych opłat oraz przejrzyste warunki bez ukrytych kosztów.`}
          />
        </div>
      </section>
      <AnswerBox
        title="Szybka odpowiedź"
        text="Sprawdź aktualne ceny kursów prawa jazdy, porównaj tryby nauki i wybierz najlepszą opcję dla siebie. Oferujemy płatności ratalne i jasne zasady bez ukrytych kosztów."
      />
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
                  {PRICES.COURSE.BASIC} zł
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
              <IntentCta intent="transactional" />
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
                  {PRICES.COURSE.EXPRESS} zł
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
              <IntentCta
                intent="transactional"
                className="block text-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              />
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
              {PRICES.INSTALLMENTS.map((rata, index) => (
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
                      {rata.amount} zł
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
                {CONTACT.BANK_ACCOUNT}
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
                  {PRICES.ADDITIONAL.TRAINING_OWN_STUDENT} zł/godz. - nasi
                  kursanci
                </li>
                <li className="flex items-center text-blue-200">
                  <HiOutlineCheck className="text-emerald-400 mr-2" />
                  {PRICES.ADDITIONAL.TRAINING_EXTERNAL} zł/godz. - dla
                  pozostałych
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

      {/* FAQ + CTA Section */}
      <section className="relative py-16 bg-gradient-to-b from-blue-950 to-gray-900">
        <div className="container mx-auto px-6">
          <FaqSection
            items={[
              {
                question: 'Co zawiera cena kursu?',
                answer:
                  'Materiały dydaktyczne, 30h teorii, 30h praktyki, egzaminy wewnętrzne oraz wsparcie instruktora.',
              },
              {
                question: 'Czy są dodatkowe opłaty?',
                answer: `Należy uwzględnić badanie lekarskie (${PRICES.ADDITIONAL.MEDICAL_EXAM} zł) i opłaty za egzamin państwowy.`,
              },
              {
                question: 'Jak działają raty?',
                answer:
                  'Płatności można rozłożyć na 5 wygodnych rat – bez dodatkowych kosztów.',
              },
            ]}
            heading="FAQ o cenach"
            className="mb-12"
          />
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
              <IntentCta
                intent="transactional"
                className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium text-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </section>
      <section className="relative py-12 bg-gradient-to-b from-gray-900 to-gray-950">
        <SuggestedLinks
          currentPath="/cennik"
          className=""
          heading="Zobacz także"
        />
      </section>
    </div>
  );
}
