'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

import Script from 'next/script';
import {
  FaCar,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaMedal,
  FaQuoteRight,
} from 'react-icons/fa';
import {
  HiOutlineAcademicCap,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiLightningBolt,
} from 'react-icons/hi';
import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera } from '@react-three/drei';
import Image from 'next/image';
import { useReservationCounter } from '@/hooks/useReservationCounter';
import {
  getStudentsCount,
  getExperienceYears,
  INSTRUCTORS_COUNT,
  formatNumber,
} from '@/constants/stats';

export default function HomePage() {
  const mainRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { remainingPlaces, monthName } = useReservationCounter();

  useEffect(() => {
    setIsVisible(true);
    setIsVideoLoaded(false);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!videoRef?.current) {
      return;
    }

    const handleVideoLoaded = () => {
      setIsVideoLoaded(true);
    };

    videoRef.current.addEventListener('loadeddata', handleVideoLoaded);

    const timer = setTimeout(() => {
      if (!isVideoLoaded) {
        setIsVideoLoaded(true);
      }
    }, 3000);

    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {
      // Obsługa błędu autoodtwarzania
      setIsVideoLoaded(true);
    });

    return () => {
      if (videoRef?.current) {
        videoRef.current.removeEventListener('loadeddata', handleVideoLoaded);
      }
      clearTimeout(timer);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -100 : -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5],
    [1, isMobile ? 0.9 : 0.8]
  );

  const mobileAnimationConfig = {
    duration: isMobile ? 0.5 : 0.8,
    scale: isMobile ? 1.02 : 1.05,
  };

  const pulseAnimation = {
    scale: [1, mobileAnimationConfig.scale, 1],
    transition: {
      duration: mobileAnimationConfig.duration * 2,
      repeat: Infinity,
      repeatType: 'reverse',
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: isMobile ? 30 : 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <>
      <Script id="schema-org" type="application/ld+json" />

      <section
        ref={mainRef}
        className="relative w-full min-h-screen overflow-x-hidden"
      >
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/80 to-purple-900/70 z-20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(67,56,202,0.4),transparent_50%)] z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.4),transparent_50%)] z-10"></div>

          <div className="absolute inset-0 overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className={`object-cover w-full h-full transform translate-y-20 ${
                isVideoLoaded ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-1000`}
            >
              <source src="/videos/main_video.mp4" type="video/mp4" />
            </video>
          </div>

          {!isVideoLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 flex items-center justify-center text-white">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
            </div>
          )}
        </div>

        <div className="relative z-30 w-full max-w-[100vw] overflow-x-hidden">
          <motion.div
            className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 text-center text-white"
            initial={{ opacity: 1, scale: 1, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="w-full max-w-4xl mx-auto"
            >
              <motion.div
                variants={fadeInUp}
                className="mb-8 md:mb-6 mt-2 sm:mt-0"
              >
                <motion.div
                  className="inline-block px-4 py-2 md:px-6 md:py-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-xs md:text-sm font-medium"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                >
                  Prawo jazdy w 2 miesiące!
                </motion.div>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 md:mb-6 break-words"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                  Qursant
                </span>
                <motion.span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mt-2 md:mt-4 text-2xl sm:text-3xl md:text-5xl">
                  Profesjonalne kursy prawa jazdy kategorii B
                </motion.span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl leading-8 text-blue-100 max-w-2xl mx-auto break-words"
              >
                Szkoła Jazdy w Bydgoszczy, gdzie 95% kursantów zdaje za
                pierwszym razem!
              </motion.p>

              <motion.div
                className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <Link
                  href="/rezerwacja"
                  className="w-full sm:w-auto group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="relative z-10">Zarezerwuj miejsce</span>
                  <span className="block text-xs md:text-sm mt-0.5 md:mt-1 opacity-90 relative z-10">
                    {remainingPlaces < 5
                      ? `Ostatnie ${remainingPlaces} wolne miejsca w ${monthName}!`
                      : `Ostatnich ${remainingPlaces} wolnych miejsc w ${monthName}!`}
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-400 z-0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-45 animate-shine" />
                </Link>

                <Link
                  href="/kursy"
                  className="w-full sm:w-auto group relative overflow-hidden rounded-full backdrop-blur-md bg-white/10 border border-white/20 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="relative z-10">Sprawdź kursy</span>
                  <span className="block text-xs md:text-sm mt-0.5 md:mt-1 opacity-90">
                    -10% do końca miesiąca
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-white/20 z-0"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden sm:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
            >
              <div className="flex flex-col items-center">
                <span className="text-sm text-white/80 mb-2">
                  Przewiń w dół
                </span>
                <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center p-1">
                  <motion.div
                    className="w-1 h-2 bg-white rounded-full"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="h-screen bg-gradient-to-b from-indigo-900 to-blue-950" />
        }
      >
        <section className="relative bg-gradient-to-b from-indigo-900 to-blue-950 py-12 sm:py-16 md:py-24">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.2),transparent_60%)]"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-100">
                  Nowoczesna flota
                </span>
              </h2>
              <p className="text-blue-200 max-w-2xl mx-auto">
                Ucz się prowadzić na najnowszych modelach pojazdów wyposażonych
                w zaawansowane systemy bezpieczeństwa
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                className="relative w-full"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/images/cars/photo-77.jpg"
                  alt="Nowoczesna flota"
                  width={1280}
                  height={720}
                  className="w-full h-auto rounded-2xl"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-transparent rounded-2xl"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="space-y-6">
                  {[
                    {
                      title: 'Bezpieczna nauka',
                      description:
                        'Wszystkie nasze pojazdy są wyposażone w systemy wspomagające naukę jazdy',
                      icon: <FaCar className="text-blue-400" />,
                    },
                    {
                      title: 'Komfortowe wnętrze',
                      description:
                        'Klimatyzowane pojazdy zapewniające komfort podczas każdej lekcji',
                      icon: <FaCar className="text-purple-400" />,
                    },
                    {
                      title: 'Podwójne sterowanie',
                      description:
                        'Instruktor zawsze może przejąć kontrolę w sytuacji zagrożenia',
                      icon: <FaCar className="text-pink-400" />,
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      }}
                    >
                      <div className="text-2xl mr-4">{feature.icon}</div>
                      <div>
                        <h3 className="text-lg font-medium text-white">
                          {feature.title}
                        </h3>
                        <p className="text-blue-200">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative bg-gradient-to-b from-blue-950 to-indigo-950 py-12 sm:py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/20 to-transparent"></div>

            <div className="absolute inset-0">
              <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-purple-600/30 to-transparent blur-3xl"></div>
              <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-gradient-to-br from-blue-600/20 to-transparent blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl"></div>
            </div>

            <svg
              className="absolute inset-0 w-full h-full opacity-30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="smallGrid"
                  width="50"
                  height="50"
                  patternUnits="userSpaceOnUse"
                >
                  <motion.circle
                    cx="25"
                    cy="25"
                    r="1.5"
                    fill="#fff"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                </pattern>
                <pattern
                  id="grid"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                >
                  <rect width="100" height="100" fill="url(#smallGrid)" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="2"
                    fill="#fff"
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-2xl text-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                  Nasza szkoła w liczbach
                </span>
              </h2>
              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </motion.div>

            <motion.div
              className="mx-auto max-w-7xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
            >
              <dl className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
                {[
                  {
                    icon: <FaUserGraduate />,
                    value: `${formatNumber(getStudentsCount())}+`,
                    label: 'Kursantów',
                    color: 'from-blue-400 to-blue-600',
                  },
                  {
                    icon: <HiOutlineClock />,
                    value: `${getExperienceYears()}+`,
                    label: 'Lat doświadczenia',
                    color: 'from-purple-400 to-purple-600',
                  },
                  {
                    icon: <FaChalkboardTeacher />,
                    value: `${INSTRUCTORS_COUNT}`,
                    label: 'Instruktorów',
                    color: 'from-pink-400 to-pink-600',
                  },
                  {
                    icon: <FaMedal />,
                    value: '95%',
                    label: 'Zdawalność',
                    color: 'from-yellow-400 to-orange-500',
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="relative group flex flex-col items-center p-8 rounded-2xl backdrop-blur-sm"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-300 backdrop-blur-sm"></div>

                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300`}
                    ></div>

                    <div className="relative z-10">
                      <div
                        className={`text-4xl bg-gradient-to-br ${stat.color} rounded-xl p-4 text-white mb-5 shadow-lg`}
                      >
                        {stat.icon}
                      </div>
                      <motion.dt
                        className={`text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.color} mb-2`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      >
                        {stat.value}
                      </motion.dt>
                      <dd className="text-base text-blue-100">{stat.label}</dd>
                    </div>
                  </motion.div>
                ))}
              </dl>
            </motion.div>
          </div>
        </section>

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

        <section className="bg-gradient-to-b from-indigo-950 to-blue-950 py-12 sm:py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1),transparent_70%)]"></div>
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
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200">
                  Co mówią nasi kursanci
                </span>
              </h2>
              <p className="text-blue-200 max-w-2xl mx-auto">
                Opinie osób, które zdobyły prawo jazdy dzięki naszej szkole
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Anna Kowalska',
                  role: 'Kategoria B',
                  image: '/images/instructors/photo-10.jpg',
                  quote:
                    'Dzięki cierpliwości instruktorów i profesjonalnemu podejściu zdałam za pierwszym razem! Polecam każdemu, kto chce szybko i bezstresowo nauczyć się jeździć.',
                  stars: 5,
                },
                {
                  name: 'Piotr Nowak',
                  role: 'Kategoria B',
                  image: '/images/instructors/photo-17.jpg',
                  quote:
                    'Świetna szkoła z nowoczesnym podejściem do nauki. Instruktorzy mają ogromne doświadczenie i potrafią przekazać wiedzę w sposób zrozumiały dla każdego.',
                  stars: 5,
                },
                {
                  name: 'Karolina Wiśniewska',
                  role: 'Kategoria B',
                  image: '/images/instructors/photo-23.jpg',
                  quote:
                    'Profesjonalna szkoła jazdy. Elastyczne godziny zajęć, które można dopasować do swojego grafiku. Polecam każdemu, kto szuka solidnej szkoły jazdy.',
                  stars: 5,
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="relative p-6 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="absolute -top-6 left-6">
                    <div className="h-12 w-12 relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 blur-md opacity-80"></div>
                      <div className="relative flex items-center justify-center h-12 w-12 rounded-full bg-blue-900 border border-blue-400 text-white">
                        <FaQuoteRight />
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 pb-4">
                    <p className="text-blue-100 mb-6">{testimonial.quote}</p>
                  </div>

                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={96}
                        height={96}
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">
                        {testimonial.name}
                      </h4>
                      <p className="text-blue-300 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                    <div className="ml-auto flex text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.stars
                              ? 'text-yellow-400'
                              : 'text-gray-400'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-slate-900 to-gray-900 py-12 sm:py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_70%)]"></div>
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
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-blue-100">
                  Często zadawane pytania
                </span>
              </h2>
              <p className="text-blue-200 max-w-2xl mx-auto">
                Odpowiedzi na najczęściej zadawane pytania dotyczące naszych
                kursów
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: 'Ile trwa kurs na prawo jazdy kat. B?',
                  answer:
                    'Kurs na prawo jazdy kategorii B składa się z 30 godzin zajęć teoretycznych oraz 30 godzin zajęć praktycznych. Całkowity czas trwania kursu zależy od indywidualnego tempa nauki, ale zwykle wynosi od 1 do 3 miesięcy.',
                },
                {
                  question:
                    'Jakie dokumenty są potrzebne, aby zapisać się na kurs?',
                  answer:
                    'Do zapisu na kurs potrzebujesz: dowodu osobistego, numeru PESEL, orzeczenia lekarskiego o braku przeciwwskazań do kierowania pojazdami, oraz zdjęcia do dokumentów. W przypadku osób niepełnoletnich wymagana jest również zgoda rodziców lub opiekunów prawnych.',
                },
                {
                  question: 'Jak wygląda egzamin państwowy?',
                  answer:
                    'Egzamin państwowy składa się z dwóch części: teoretycznej i praktycznej. Część teoretyczna to test komputerowy składający się z pytań jednokrotnego wyboru. Część praktyczna obejmuje wykonanie zadań na placu manewrowym oraz jazdę w ruchu drogowym pod nadzorem egzaminatora.',
                },
                {
                  question:
                    'Czy oferujecie jazdy doszkalające przed egzaminem?',
                  answer:
                    'Tak, oferujemy dodatkowe jazdy doszkalające dla osób, które chcą lepiej przygotować się do egzaminu praktycznego. Możesz wykupić dowolną liczbę dodatkowych godzin jazdy z instruktorem.',
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-medium text-white">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 ml-4">
                      <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-blue-100">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-12 sm:py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl bg-gradient-to-br from-blue-900 to-indigo-900 overflow-hidden shadow-2xl shadow-blue-500/20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12 lg:p-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-4xl font-bold text-white mb-4">
                      Rozpocznij swoją przygodę z kierownicą już dziś
                    </h2>
                    <p className="text-blue-100 text-lg mb-8">
                      Zapisz się na kurs i zdobądź prawo jazdy pod okiem
                      doświadczonych instruktorów
                    </p>
                    <ul className="space-y-4 mb-10">
                      {[
                        'Elastyczne terminy zajęć',
                        'Profesjonalni instruktorzy',
                        'Nowoczesna flota pojazdów',
                        'Wysoka zdawalność egzaminów',
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center text-blue-100"
                        >
                          <svg
                            className="w-5 h-5 text-green-400 mr-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                    <Link
                      href="/kontakt"
                      className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                    >
                      <span>Skontaktuj się z nami</span>
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
                <div className="relative hidden lg:block">
                  <Image
                    src="/images/course/photo-20.jpg"
                    alt="Szkolenie na prawo jazdy"
                    width={1280}
                    height={720}
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent"></div>

                  <motion.div
                    className="absolute top-16 right-16 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl w-64"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-blue-500/20 rounded-lg mr-4">
                        <HiOutlineUserGroup className="text-blue-300 text-2xl" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Małe grupy</h4>
                        <p className="text-blue-200 text-sm">
                          Indywidualne podejście
                        </p>
                      </div>
                    </div>
                    <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-4"></div>
                    <p className="text-blue-100 text-sm">
                      Szkolimy w małych grupach, aby zapewnić każdemu
                      uczestnikowi indywidualne podejście i maksymalną
                      efektywność nauki.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </Suspense>
    </>
  );
}
