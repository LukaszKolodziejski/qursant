'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import {
  FaCar,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaMedal,
  FaQuoteRight,
  FaAward,
  FaStar,
  FaGraduationCap,
  FaUserTie,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
} from 'react-icons/fa';
import {
  HiOutlineAcademicCap,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiLightningBolt,
  HiOutlineLocationMarker,
  HiOutlineBadgeCheck,
} from 'react-icons/hi';

const instruktorzy = [
  {
    name: 'Robert Langer',
    role: 'Właściciel / Główny Instruktor',
    experience: '20+ lat doświadczenia',
    specialization: 'Kategorie: A, B, C, D',
    image: '/images/photo-1.jpg',
  },
  {
    name: 'Anna Kowalska',
    role: 'Instruktor',
    experience: '10+ lat doświadczenia',
    specialization: 'Kategorie: B',
    image: '/images/photo-2.jpg',
  },
  {
    name: 'Marek Nowak',
    role: 'Instruktor',
    experience: '15+ lat doświadczenia',
    specialization: 'Kategorie: B, C',
    image: '/images/photo-3.jpg',
  },
];

export default function AboutPage() {
  const containerRef = useRef(null);
  const [activeInstructor, setActiveInstructor] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
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

  // Dodajemy nowe warianty animacji
  const pageTransition = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const staggerItems = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <div className="relative min-h-screen">
      {/* Hero Section z gradientami */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
        {/* Animowane tło */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, rgba(67,56,202,0.4), transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(67,56,202,0.4), transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(67,56,202,0.4), transparent 50%)',
                'radial-gradient(circle at 0% 100%, rgba(67,56,202,0.4), transparent 50%)',
                'radial-gradient(circle at 0% 0%, rgba(67,56,202,0.4), transparent 50%)',
              ],
            }}
            transition={{
              duration: 15,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop',
            }}
            className="absolute inset-0 z-10"
          ></motion.div>
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 100% 100%, rgba(99,102,241,0.4), transparent 50%)',
                'radial-gradient(circle at 0% 100%, rgba(99,102,241,0.4), transparent 50%)',
                'radial-gradient(circle at 0% 0%, rgba(99,102,241,0.4), transparent 50%)',
                'radial-gradient(circle at 100% 0%, rgba(99,102,241,0.4), transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(99,102,241,0.4), transparent 50%)',
              ],
            }}
            transition={{
              duration: 15,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop',
              delay: 0,
            }}
            className="absolute inset-0 z-10"
          ></motion.div>
        </motion.div>

        <div className="relative z-30 container mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                Poznaj nas bliżej
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                O Nas
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-xl leading-8 text-blue-100 max-w-2xl"
            >
              Od 2009 roku kształcimy najlepszych kierowców w Bydgoszczy, łącząc
              tradycję z nowoczesnością. Nasza szkoła to nie tylko miejsce
              nauki, to społeczność pasjonatów motoryzacji.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2 text-blue-300">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>Bydgoszcz</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-300">
                <FaClock className="text-blue-400" />
                <span>14 lat doświadczenia</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-300">
                <FaUsers className="text-blue-400" />
                <span>3000+ zadowolonych kursantów</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Dodajemy pływające elementy dekoracyjne */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute right-[10%] top-[20%] w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute left-[15%] bottom-[30%] w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"
        />
      </section>

      {/* Sekcja Misji */}
      <section className="relative py-24 bg-gradient-to-b from-indigo-900 to-blue-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                    Nasza Misja
                  </span>
                </h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Qursant to przede wszystkim wspaniali doświadczeni i gotowi do
                  pomocy instruktorzy. Od lat zajmujemy wysokie miejsca we
                  wszelkich rankingach bydgoskich szkół jazdy. Działamy
                  rzetelnie, dlatego jesteśmy szkołą chętnie polecaną przez
                  naszych kursantów.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <HiOutlineBadgeCheck className="text-emerald-400" />,
                    text: 'Profesjonalne podejście',
                  },
                  {
                    icon: <HiOutlineLocationMarker className="text-blue-400" />,
                    text: 'Dogodna lokalizacja',
                  },
                  {
                    icon: <HiOutlineClock className="text-purple-400" />,
                    text: 'Elastyczne godziny',
                  },
                  {
                    icon: <HiOutlineUserGroup className="text-pink-400" />,
                    text: 'Indywidualne podejście',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 bg-white/5 rounded-lg p-4"
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <span className="text-blue-100">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 mix-blend-multiply rounded-2xl"></div>
              <Image
                src="/images/photo-1.jpg"
                alt="Szkoła Jazdy Qursant"
                width={800}
                height={600}
                className="w-full h-auto rounded-2xl"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sekcja Instruktorów - nowy styl */}
      <section className="bg-gradient-to-b from-blue-950 to-indigo-950 py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.1),transparent_70%)]"></div>
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">
                Nasi instruktorzy
              </span>
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Poznaj zespół doświadczonych instruktorów, którzy pomogą Ci zdobyć
              prawo jazdy
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {instruktorzy.map((instruktor, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative rounded-2xl bg-gradient-to-br from-blue-900/40 to-slate-900/40 backdrop-blur-sm border border-blue-500/10"
              >
                <div className="relative w-full overflow-hidden rounded-t-2xl">
                  <Image
                    src={instruktor.image}
                    alt={instruktor.name}
                    width={600}
                    height={600}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {instruktor.name}
                  </h3>
                  <p className="text-blue-300 mb-2">{instruktor.role}</p>
                  <div className="flex items-center text-blue-200 text-sm">
                    <HiOutlineAcademicCap className="mr-2" />
                    <span>{instruktor.experience}</span>
                  </div>
                  <div className="flex items-center text-blue-200 text-sm mt-1">
                    <FaCar className="mr-2" />
                    <span>{instruktor.specialization}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sekcja Wyposażenia */}
      <section className="relative py-24 bg-gradient-to-b from-indigo-950 to-purple-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15),transparent_70%)]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
                Nowoczesne Wyposażenie
              </span>
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Zapewniamy najwyższy komfort nauki
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Sala Wykładowa
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-blue-200">
                    <HiLightningBolt className="text-purple-400 mr-2" />
                    Klimatyzowana sala
                  </li>
                  <li className="flex items-center text-blue-200">
                    <HiLightningBolt className="text-purple-400 mr-2" />
                    TV 4K z najnowszym oprogramowaniem
                  </li>
                  <li className="flex items-center text-blue-200">
                    <HiLightningBolt className="text-purple-400 mr-2" />
                    Komfortowe miejsca dla kursantów
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Flota Pojazdów
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-blue-200">
                    <HiLightningBolt className="text-purple-400 mr-2" />
                    Najnowsze toyoty yaris 2021r
                  </li>
                  <li className="flex items-center text-blue-200">
                    <HiLightningBolt className="text-purple-400 mr-2" />6
                    nowoczesnych pojazdów szkoleniowych
                  </li>
                  <li className="flex items-center text-blue-200">
                    <HiLightningBolt className="text-purple-400 mr-2" />
                    Pełne wyposażenie bezpieczeństwa
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full"
            >
              <Image
                src="/images/photo-78.jpg"
                alt="Wyposażenie Qursant"
                width={800}
                height={600}
                className="w-full h-auto rounded-2xl"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
