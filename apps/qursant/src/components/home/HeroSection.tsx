'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useReservationCounter } from '@/hooks/useReservationCounter';
import { getExperienceYears } from '@/constants/stats';

export default function HeroSection() {
  const mainRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const { remainingPlaces, monthName } = useReservationCounter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lazy load video - ładuj dopiero po 1 sekundzie (dla lepszego LCP)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoadVideo(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!videoRef?.current || !shouldLoadVideo) {
      return;
    }

    const handleVideoLoaded = () => {
      setIsVideoLoaded(true);
    };

    const currentVideo = videoRef.current;
    currentVideo.addEventListener('loadeddata', handleVideoLoaded);

    const timer = setTimeout(() => {
      if (!isVideoLoaded) {
        setIsVideoLoaded(true);
      }
    }, 3000);

    currentVideo.currentTime = 0;
    currentVideo.play().catch(() => {
      setIsVideoLoaded(true);
    });

    return () => {
      if (currentVideo) {
        currentVideo.removeEventListener('loadeddata', handleVideoLoaded);
      }
      clearTimeout(timer);
    };
  }, [isVideoLoaded, shouldLoadVideo]);

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
    <section
      ref={mainRef}
      data-homepage
      className="relative w-full min-h-screen overflow-x-hidden"
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/80 to-purple-900/70 z-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(67,56,202,0.4),transparent_50%)] z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.4),transparent_50%)] z-10"></div>

        {shouldLoadVideo && (
          <div className="absolute inset-0 overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className={`object-cover w-full h-full transform translate-y-20 ${
                isVideoLoaded ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-1000`}
            >
              <source src="/videos/main_video.mp4" type="video/mp4" />
            </video>
          </div>
        )}

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
              Najwyższa zdawalność w Bydgoszczy od {getExperienceYears()} lat
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
                  Ceny promocyjne do końca miesiąca
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
              <span className="text-sm text-white/80 mb-2">Przewiń w dół</span>
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
  );
}
