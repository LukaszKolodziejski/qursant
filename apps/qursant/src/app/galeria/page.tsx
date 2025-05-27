'use client';

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef, useMemo } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { galleryImages } from '../../data/galleryImages';

export default function GaleriaPage() {
  const [horizontalSlideIndex1, setHorizontalSlideIndex1] = useState(0);
  const [horizontalSlideIndex2, setHorizontalSlideIndex2] = useState(0);
  const [horizontalSlideIndex3, setHorizontalSlideIndex3] = useState(0);
  const [verticalStartIndex1, setVerticalStartIndex1] = useState(0);
  const [verticalStartIndex2, setVerticalStartIndex2] = useState(0);
  const [verticalStartIndex3, setVerticalStartIndex3] = useState(0);
  const [displayCount, setDisplayCount] = useState(3);
  const [isLoaded, setIsLoaded] = useState(false);
  const horizontalSliderRef1 = useRef<HTMLDivElement>(null);
  const horizontalSliderRef2 = useRef<HTMLDivElement>(null);
  const horizontalSliderRef3 = useRef<HTMLDivElement>(null);
  const verticalSliderRef1 = useRef<HTMLDivElement>(null);
  const verticalSliderRef2 = useRef<HTMLDivElement>(null);
  const verticalSliderRef3 = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Podział zdjęć poziomych na 3 grupy
  const { horizontalImages1, horizontalImages2, horizontalImages3 } =
    useMemo(() => {
      const allHorizontal = galleryImages.filter(
        (img) => img.orientation === 'horizontal'
      );
      const chunkSize = Math.ceil(allHorizontal.length / 3);
      return {
        horizontalImages1: allHorizontal.slice(0, chunkSize),
        horizontalImages2: allHorizontal.slice(chunkSize, chunkSize * 2),
        horizontalImages3: allHorizontal.slice(chunkSize * 2),
      };
    }, []);

  // Podział zdjęć pionowych na 3 grupy
  const { verticalImages1, verticalImages2, verticalImages3 } = useMemo(() => {
    const allVertical = galleryImages.filter(
      (img) => img.orientation === 'vertical'
    );
    const chunkSize = Math.ceil(allVertical.length / 3);
    return {
      verticalImages1: allVertical.slice(0, chunkSize),
      verticalImages2: allVertical.slice(chunkSize, chunkSize * 2),
      verticalImages3: allVertical.slice(chunkSize * 2),
    };
  }, []);

  // Ustawienie początkowych wartości
  useEffect(() => {
    setIsLoaded(true);
    setDisplayCount(window.innerWidth >= 1024 ? 3 : 1);

    const handleResize = () => {
      setDisplayCount(window.innerWidth >= 1024 ? 3 : 1);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatyczne przewijanie karuzeli
  useEffect(() => {
    if (!isLoaded) return;

    const intervals = [
      setInterval(() => {
        setHorizontalSlideIndex1((prev) =>
          prev === horizontalImages1.length - 1 ? 0 : prev + 1
        );
      }, 5000),
      setInterval(() => {
        setVerticalStartIndex1(
          (prev) => (prev + displayCount) % verticalImages1.length
        );
      }, 6000),
      setInterval(() => {
        setHorizontalSlideIndex2((prev) =>
          prev === horizontalImages2.length - 1 ? 0 : prev + 1
        );
      }, 7000),
      setInterval(() => {
        setVerticalStartIndex2(
          (prev) => (prev + displayCount) % verticalImages2.length
        );
      }, 8000),
      setInterval(() => {
        setHorizontalSlideIndex3((prev) =>
          prev === horizontalImages3.length - 1 ? 0 : prev + 1
        );
      }, 9000),
      setInterval(() => {
        setVerticalStartIndex3(
          (prev) => (prev + displayCount) % verticalImages3.length
        );
      }, 10000),
    ];

    return () => intervals.forEach(clearInterval);
  }, [
    horizontalImages1.length,
    horizontalImages2.length,
    horizontalImages3.length,
    verticalImages1.length,
    verticalImages2.length,
    verticalImages3.length,
    isLoaded,
    displayCount,
  ]);

  // Funkcje nawigacji
  const navigateHorizontal1 = (direction: 'prev' | 'next') => {
    setHorizontalSlideIndex1((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? horizontalImages1.length - 1 : prev - 1;
      }
      return prev === horizontalImages1.length - 1 ? 0 : prev + 1;
    });
  };

  const navigateHorizontal2 = (direction: 'prev' | 'next') => {
    setHorizontalSlideIndex2((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? horizontalImages2.length - 1 : prev - 1;
      }
      return prev === horizontalImages2.length - 1 ? 0 : prev + 1;
    });
  };

  const navigateHorizontal3 = (direction: 'prev' | 'next') => {
    setHorizontalSlideIndex3((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? horizontalImages3.length - 1 : prev - 1;
      }
      return prev === horizontalImages3.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen mt-12 bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900"
    >
      {/* Hero section */}
      <motion.section
        className="relative h-[30vh] flex items-center justify-center overflow-hidden"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),transparent_70%)]" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Nasza Galeria
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Poznaj naszą szkołę, instruktorów i flotę pojazdów
          </p>
        </motion.div>
      </motion.section>

      {/* Pierwsza karuzela pozioma (H) */}
      <section className="relative py-12 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            ref={horizontalSliderRef1}
            className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-2xl"
          >
            <AnimatePresence mode="wait">
              {horizontalImages1.length > 0 && (
                <motion.div
                  key={horizontalSlideIndex1}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={horizontalImages1[horizontalSlideIndex1].src}
                    alt={horizontalImages1[horizontalSlideIndex1].alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-8 left-8 max-w-xl hidden md:block"
                  >
                    <h3 className="text-4xl font-bold text-white mb-4">
                      {horizontalImages1[horizontalSlideIndex1].alt}
                    </h3>
                    <p className="text-xl text-white/90">
                      {horizontalImages1[horizontalSlideIndex1].description}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Przyciski nawigacji */}
            {horizontalImages1.length > 1 && (
              <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => navigateHorizontal1('prev')}
                  className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 border border-white/20"
                >
                  <FaChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => navigateHorizontal1('next')}
                  className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 border border-white/20"
                >
                  <FaChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            )}

            {/* Wskaźniki slajdów */}
            {horizontalImages1.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {horizontalImages1.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === horizontalSlideIndex1
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50'
                    }`}
                    onClick={() => setHorizontalSlideIndex1(index)}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Pierwsza karuzela pionowa (V) */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="container mx-auto px-6">
          <div className="relative">
            <motion.div
              ref={verticalSliderRef1}
              className="relative w-full aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] max-h-[80vh] overflow-hidden rounded-3xl shadow-2xl"
            >
              <AnimatePresence mode="wait">
                {verticalImages1.length > 0 && (
                  <motion.div
                    key={verticalStartIndex1}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent opacity-60" />
                    <Image
                      src={verticalImages1[verticalStartIndex1].src}
                      alt={verticalImages1[verticalStartIndex1].alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 p-4 md:p-12 backdrop-blur-sm bg-black/20"
                    >
                      <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4 text-center line-clamp-2 md:line-clamp-none">
                          {verticalImages1[verticalStartIndex1].alt}
                        </h3>
                        <p className="text-sm md:text-xl text-white/90 text-center max-w-2xl mx-auto line-clamp-2 md:line-clamp-none">
                          {verticalImages1[verticalStartIndex1].description}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Przyciski nawigacji */}
              {verticalImages1.length > 1 && (
                <div className="absolute inset-y-0 left-2 right-2 md:left-4 md:right-4 flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setVerticalStartIndex1((prev) =>
                        prev === 0 ? verticalImages1.length - 1 : prev - 1
                      )
                    }
                    className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 border border-white/20 shadow-lg hover:bg-white/20"
                  >
                    <FaChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setVerticalStartIndex1((prev) =>
                        prev === verticalImages1.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 border border-white/20 shadow-lg hover:bg-white/20"
                  >
                    <FaChevronRight className="w-5 h-5 md:w-8 md:h-8" />
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* Wskaźniki slajdów */}
            {verticalImages1.length > 1 && (
              <div className="absolute -bottom-16 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 bg-black/40 md:bg-transparent px-4 py-3 md:p-0 rounded-full backdrop-blur-md md:backdrop-blur-none">
                {verticalImages1.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`h-3 md:h-2 rounded-full transition-all duration-500 ${
                      index === verticalStartIndex1
                        ? 'w-10 md:w-8 bg-white'
                        : 'w-3 md:w-2 bg-white/50'
                    }`}
                    onClick={() => setVerticalStartIndex1(index)}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Druga karuzela pozioma (H) */}
      <section className="relative py-12 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            ref={horizontalSliderRef2}
            className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-2xl"
          >
            <AnimatePresence mode="wait">
              {horizontalImages2.length > 0 && (
                <motion.div
                  key={horizontalSlideIndex2}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={horizontalImages2[horizontalSlideIndex2].src}
                    alt={horizontalImages2[horizontalSlideIndex2].alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-8 left-8 max-w-xl hidden md:block"
                  >
                    <h3 className="text-4xl font-bold text-white mb-4">
                      {horizontalImages2[horizontalSlideIndex2].alt}
                    </h3>
                    <p className="text-xl text-white/90">
                      {horizontalImages2[horizontalSlideIndex2].description}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Przyciski nawigacji */}
            {horizontalImages2.length > 1 && (
              <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => navigateHorizontal2('prev')}
                  className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 border border-white/20"
                >
                  <FaChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => navigateHorizontal2('next')}
                  className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 border border-white/20"
                >
                  <FaChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            )}

            {/* Wskaźniki slajdów */}
            {horizontalImages2.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {horizontalImages2.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === horizontalSlideIndex2
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50'
                    }`}
                    onClick={() => setHorizontalSlideIndex2(index)}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Druga karuzela pionowa (V) */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="container mx-auto px-6">
          <div className="relative">
            <motion.div
              ref={verticalSliderRef2}
              className="relative w-full aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] max-h-[80vh] overflow-hidden rounded-3xl shadow-2xl"
            >
              <AnimatePresence mode="wait">
                {verticalImages2.length > 0 && (
                  <motion.div
                    key={verticalStartIndex2}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent opacity-60" />
                    <Image
                      src={verticalImages2[verticalStartIndex2].src}
                      alt={verticalImages2[verticalStartIndex2].alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 p-4 md:p-12 backdrop-blur-sm bg-black/20"
                    >
                      <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4 text-center line-clamp-2 md:line-clamp-none">
                          {verticalImages2[verticalStartIndex2].alt}
                        </h3>
                        <p className="text-sm md:text-xl text-white/90 text-center max-w-2xl mx-auto line-clamp-2 md:line-clamp-none">
                          {verticalImages2[verticalStartIndex2].description}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Przyciski nawigacji */}
              {verticalImages2.length > 1 && (
                <div className="absolute inset-y-0 left-2 right-2 md:left-4 md:right-4 flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setVerticalStartIndex2((prev) =>
                        prev === 0 ? verticalImages2.length - 1 : prev - 1
                      )
                    }
                    className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 border border-white/20 shadow-lg hover:bg-white/20"
                  >
                    <FaChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setVerticalStartIndex2((prev) =>
                        prev === verticalImages2.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 border border-white/20 shadow-lg hover:bg-white/20"
                  >
                    <FaChevronRight className="w-5 h-5 md:w-8 md:h-8" />
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* Wskaźniki slajdów */}
            {verticalImages2.length > 1 && (
              <div className="absolute -bottom-16 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 bg-black/40 md:bg-transparent px-4 py-3 md:p-0 rounded-full backdrop-blur-md md:backdrop-blur-none">
                {verticalImages2.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`h-3 md:h-2 rounded-full transition-all duration-500 ${
                      index === verticalStartIndex2
                        ? 'w-10 md:w-8 bg-white'
                        : 'w-3 md:w-2 bg-white/50'
                    }`}
                    onClick={() => setVerticalStartIndex2(index)}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trzecia karuzela pozioma (H) */}
      <section className="relative py-12 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            ref={horizontalSliderRef3}
            className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-2xl"
          >
            <AnimatePresence mode="wait">
              {horizontalImages3.length > 0 && (
                <motion.div
                  key={horizontalSlideIndex3}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={horizontalImages3[horizontalSlideIndex3].src}
                    alt={horizontalImages3[horizontalSlideIndex3].alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-8 left-8 max-w-xl hidden md:block"
                  >
                    <h3 className="text-4xl font-bold text-white mb-4">
                      {horizontalImages3[horizontalSlideIndex3].alt}
                    </h3>
                    <p className="text-xl text-white/90">
                      {horizontalImages3[horizontalSlideIndex3].description}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Przyciski nawigacji */}
            {horizontalImages3.length > 1 && (
              <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => navigateHorizontal3('prev')}
                  className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 border border-white/20"
                >
                  <FaChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => navigateHorizontal3('next')}
                  className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 border border-white/20"
                >
                  <FaChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            )}

            {/* Wskaźniki slajdów */}
            {horizontalImages3.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {horizontalImages3.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === horizontalSlideIndex3
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50'
                    }`}
                    onClick={() => setHorizontalSlideIndex3(index)}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Trzecia karuzela pionowa (V) */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="container mx-auto px-6">
          <div className="relative">
            <motion.div
              ref={verticalSliderRef3}
              className="relative w-full aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] max-h-[80vh] overflow-hidden rounded-3xl shadow-2xl"
            >
              <AnimatePresence mode="wait">
                {verticalImages3.length > 0 && (
                  <motion.div
                    key={verticalStartIndex3}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent opacity-60" />
                    <Image
                      src={verticalImages3[verticalStartIndex3].src}
                      alt={verticalImages3[verticalStartIndex3].alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 p-4 md:p-12 backdrop-blur-sm bg-black/20"
                    >
                      <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4 text-center line-clamp-2 md:line-clamp-none">
                          {verticalImages3[verticalStartIndex3].alt}
                        </h3>
                        <p className="text-sm md:text-xl text-white/90 text-center max-w-2xl mx-auto line-clamp-2 md:line-clamp-none">
                          {verticalImages3[verticalStartIndex3].description}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Przyciski nawigacji */}
              {verticalImages3.length > 1 && (
                <div className="absolute inset-y-0 left-2 right-2 md:left-4 md:right-4 flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setVerticalStartIndex3((prev) =>
                        prev === 0 ? verticalImages3.length - 1 : prev - 1
                      )
                    }
                    className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 border border-white/20 shadow-lg hover:bg-white/20"
                  >
                    <FaChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setVerticalStartIndex3((prev) =>
                        prev === verticalImages3.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 border border-white/20 shadow-lg hover:bg-white/20"
                  >
                    <FaChevronRight className="w-5 h-5 md:w-8 md:h-8" />
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* Wskaźniki slajdów */}
            {verticalImages3.length > 1 && (
              <div className="absolute -bottom-16 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 bg-black/40 md:bg-transparent px-4 py-3 md:p-0 rounded-full backdrop-blur-md md:backdrop-blur-none">
                {verticalImages3.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`h-3 md:h-2 rounded-full transition-all duration-500 ${
                      index === verticalStartIndex3
                        ? 'w-10 md:w-8 bg-white'
                        : 'w-3 md:w-2 bg-white/50'
                    }`}
                    onClick={() => setVerticalStartIndex3(index)}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
