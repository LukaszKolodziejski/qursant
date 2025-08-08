'use client';

import { motion } from 'framer-motion';
import {
  HiOutlineClock,
  HiOutlineUserGroup,
  HiLightningBolt,
} from 'react-icons/hi';
import {
  FaCar,
  FaGraduationCap,
  FaRoad,
  FaBook,
  FaPhoneAlt,
} from 'react-icons/fa';
import { BsCalendarCheck, BsClock, BsPinMap } from 'react-icons/bs';
import { CONTACT } from '@/constants/contact';
import FaqSection from '@/components/seo/FaqSection';
import { COURSE } from '@/constants/course';
import AnswerBox from '@/components/seo/AnswerBox';
import IntentCta from '@/components/seo/IntentCta';
import SuggestedLinks from '@/components/seo/SuggestedLinks';

export default function KursyPage() {
  // Animacje
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-indigo-950 to-blue-950 py-8">
        <div className="container mx-auto px-6">
          <AnswerBox
            title="Czym jest kurs prawa jazdy kategorii B w Qursant?"
            text="Kurs prawa jazdy kat. B w Qursant to 30 godzin teorii i 30 godzin praktyki na nowoczesnych Oplach Corsach. Stawiamy na małe grupy, elastyczne terminy i indywidualne podejście, co przekłada się na wysoką zdawalność egzaminów."
          />
        </div>
      </section>
      <AnswerBox
        title="Szybka odpowiedź"
        text="Kurs kat. B obejmuje 30 godzin teorii i 30 godzin praktyki. Zajęcia odbywają się w elastycznych terminach, a najbliższy kurs startuje już wkrótce. Zarezerwuj miejsce online."
      />
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                Kursy na prawo jazdy
              </span>
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Profesjonalne szkolenia z doświadczonymi instruktorami
            </p>
          </motion.div>

          {/* Najbliższy termin - wyróżniony */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto bg-gradient-to-r from-yellow-400/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20"
          >
            <div className="flex items-center justify-center space-x-4 text-yellow-300 mb-4">
              <HiLightningBolt className="text-3xl" />
              <h2 className="text-2xl font-semibold">Najbliższy kurs</h2>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-2">
                {COURSE.NEXT_START_DATE}
              </p>
              <p className="text-xl text-blue-200">
                Start o godzinie {COURSE.START_TIME}
              </p>
            </div>
            <div className="mt-6 text-center">
              <IntentCta
                intent="transactional"
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium text-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Informacje o kursie */}
      <section className="relative py-24 bg-gradient-to-b from-purple-950 to-indigo-950">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Czas trwania */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <HiOutlineClock className="text-2xl text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Czas trwania
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start text-blue-200">
                  <FaBook className="mt-1 mr-3 text-blue-400" />
                  <div>
                    <span className="font-medium text-white">Teoria:</span>
                    <br />
                    {COURSE.DURATION.THEORY.HOURS} godzin lekcyjnych (
                    {COURSE.DURATION.THEORY.WEEKS} tygodnie)
                  </div>
                </li>
                <li className="flex items-start text-blue-200">
                  <FaCar className="mt-1 mr-3 text-blue-400" />
                  <div>
                    <span className="font-medium text-white">Praktyka:</span>
                    <br />
                    {COURSE.DURATION.PRACTICE.HOURS} godzin zegarowych (
                    {COURSE.DURATION.PRACTICE.WEEKS} tygodni)
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Harmonogram */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <BsCalendarCheck className="text-2xl text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Harmonogram
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start text-blue-200">
                  <BsClock className="mt-1 mr-3 text-purple-400" />
                  <div>
                    <span className="font-medium text-white">
                      Tryb tygodniowy:
                    </span>
                    <br />
                    {COURSE.SCHEDULE.WEEKDAY.DAYS}, godz.{' '}
                    {COURSE.SCHEDULE.WEEKDAY.TIME}
                  </div>
                </li>
                <li className="flex items-start text-blue-200">
                  <BsClock className="mt-1 mr-3 text-purple-400" />
                  <div>
                    <span className="font-medium text-white">
                      Tryb weekendowy:
                    </span>
                    <br />
                    {COURSE.SCHEDULE.WEEKEND.INFO}
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Lokalizacja */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <BsPinMap className="text-2xl text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Lokalizacja
                </h3>
              </div>
              <div className="space-y-3">
                <p className="text-blue-200">
                  <span className="font-medium text-white">Adres:</span>
                  <br />
                  Bydgoszcz, ul. K. Ujejskiego 46a – Pawilon
                </p>
                <p className="text-blue-200">
                  <span className="font-medium text-white">
                    Dla zamiejscowych:
                  </span>
                  <br />
                  Możliwość rozpoczęcia jazd z PKS
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Dodatkowe informacje */}
      <section className="relative py-24 bg-gradient-to-b from-indigo-950 to-blue-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">
                Co nas wyróżnia
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaCar className="text-3xl text-blue-400" />,
                title: 'Nowe samochody',
                description: 'Szkolenie na nowych Oplach Corsach',
              },
              {
                icon: (
                  <HiOutlineUserGroup className="text-3xl text-purple-400" />
                ),
                title: 'Małe grupy',
                description: 'Indywidualne podejście do kursanta',
              },
              {
                icon: <FaGraduationCap className="text-3xl text-emerald-400" />,
                title: 'Doświadczeni instruktorzy',
                description: 'Wieloletnie doświadczenie w szkoleniu',
              },
              {
                icon: <FaRoad className="text-3xl text-yellow-400" />,
                title: 'Elastyczne terminy',
                description: 'Dostosowane do Twoich potrzeb',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 text-center"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-blue-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + CTA Section */}
      <section className="relative py-16 bg-gradient-to-b from-blue-950 to-gray-900">
        <div className="container mx-auto px-6">
          <FaqSection
            items={[
              {
                question: 'Ile trwa kurs kat. B?',
                answer:
                  'Standardowo 1–3 miesiące (30h teorii i 30h praktyki). Tryb ekspresowy pozwala ukończyć kurs w 2–4 tygodnie.',
              },
              {
                question: 'Jak zapisać się na kurs?',
                answer:
                  'Wybierz termin i zapisz się online na stronie rezerwacji lub skontaktuj się z nami telefonicznie.',
              },
              {
                question: 'Czy można rozłożyć płatność na raty?',
                answer:
                  'Tak, oferujemy 5 wygodnych rat bez dodatkowych kosztów.',
              },
            ]}
            heading="FAQ o kursach"
            className="mb-12"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Nie czekaj, zapisz się już dziś!
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <IntentCta
                intent="transactional"
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              />
              <a
                href={`tel:${CONTACT.PHONE_RAW}`}
                className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300"
              >
                Zadzwoń: {CONTACT.PHONE}
                <FaPhoneAlt className="ml-2" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="relative py-12 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-6">
          <SuggestedLinks currentPath="/kursy" heading="Zobacz także" />
        </div>
      </section>
    </div>
  );
}
