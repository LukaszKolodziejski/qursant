'use client';

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef, useMemo } from 'react';
import {
  FaCar,
  FaUsers,
  FaBuilding,
  FaGraduationCap,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { HiOutlineCamera } from 'react-icons/hi';
import { galleryImages } from '../../data/galleryImages';
import { ImageCategory } from '../../types/gallery';

export default function GaleriaPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<ImageCategory>('all');
  const [horizontalSlideIndex, setHorizontalSlideIndex] = useState(0);
  const [verticalStartIndex, setVerticalStartIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(3);
  const [isLoaded, setIsLoaded] = useState(false);
  const horizontalSliderRef = useRef<HTMLDivElement>(null);
  const verticalSliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const horizontalImages = useMemo(
    () => galleryImages.filter((img) => img.orientation === 'horizontal'),
    []
  );

  // Losowanie kolejności zdjęć pionowych
  const verticalImages = useMemo(() => {
    const images = galleryImages.filter(
      (img) => img.orientation === 'vertical'
    );
    // Fisher-Yates shuffle algorithm
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }
    return images;
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

    const horizontalInterval = setInterval(() => {
      setHorizontalSlideIndex((prev) =>
        prev === horizontalImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    const verticalInterval = setInterval(() => {
      setVerticalStartIndex(
        (prev) => (prev + displayCount) % verticalImages.length
      );
    }, 8000);

    return () => {
      clearInterval(horizontalInterval);
      clearInterval(verticalInterval);
    };
  }, [horizontalImages.length, verticalImages.length, isLoaded, displayCount]);

  // Nawigacja karuzeli
  const navigateHorizontal = (direction: 'prev' | 'next') => {
    setHorizontalSlideIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? horizontalImages.length - 1 : prev - 1;
      }
      return prev === horizontalImages.length - 1 ? 0 : prev + 1;
    });
  };

  const navigateVertical = () => {
    setVerticalStartIndex(
      (prev) => (prev + displayCount) % verticalImages.length
    );
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

      {/* Karuzela ze zdjęciami poziomymi */}
      <section className="relative py-12 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            ref={horizontalSliderRef}
            className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-2xl"
          >
            <AnimatePresence mode="wait">
              {horizontalImages.length > 0 && (
                <motion.div
                  key={horizontalSlideIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={horizontalImages[horizontalSlideIndex].src}
                    alt={horizontalImages[horizontalSlideIndex].alt}
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
                      {horizontalImages[horizontalSlideIndex].alt}
                    </h3>
                    <p className="text-xl text-white/90">
                      {horizontalImages[horizontalSlideIndex].description}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Przyciski nawigacji */}
            {horizontalImages.length > 1 && (
              <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => navigateHorizontal('prev')}
                  className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 border border-white/20"
                >
                  <FaChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => navigateHorizontal('next')}
                  className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 border border-white/20"
                >
                  <FaChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            )}

            {/* Wskaźniki slajdów */}
            {horizontalImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {horizontalImages.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === horizontalSlideIndex
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50'
                    }`}
                    onClick={() => setHorizontalSlideIndex(index)}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Karuzela ze zdjęciami pionowymi */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="container mx-auto px-6">
          <div className="relative">
            <motion.div
              ref={verticalSliderRef}
              className="relative w-full aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] max-h-[80vh] overflow-hidden rounded-3xl shadow-2xl"
            >
              <AnimatePresence mode="wait">
                {verticalImages.length > 0 && (
                  <motion.div
                    key={verticalStartIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent opacity-60" />
                    <Image
                      src={verticalImages[verticalStartIndex].src}
                      alt={verticalImages[verticalStartIndex].alt}
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
                          {verticalImages[verticalStartIndex].alt}
                        </h3>
                        <p className="text-sm md:text-xl text-white/90 text-center max-w-2xl mx-auto line-clamp-2 md:line-clamp-none">
                          {verticalImages[verticalStartIndex].description}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Przyciski nawigacji */}
              {verticalImages.length > 1 && (
                <div className="absolute inset-y-0 left-2 right-2 md:left-4 md:right-4 flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setVerticalStartIndex((prev) =>
                        prev === 0 ? verticalImages.length - 1 : prev - 1
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
                      setVerticalStartIndex((prev) =>
                        prev === verticalImages.length - 1 ? 0 : prev + 1
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
            {verticalImages.length > 1 && (
              <div className="absolute -bottom-16 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 bg-black/40 md:bg-transparent px-4 py-3 md:p-0 rounded-full backdrop-blur-md md:backdrop-blur-none">
                {verticalImages.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`h-3 md:h-2 rounded-full transition-all duration-500 ${
                      index === verticalStartIndex
                        ? 'w-10 md:w-8 bg-white'
                        : 'w-3 md:w-2 bg-white/50'
                    }`}
                    onClick={() => setVerticalStartIndex(index)}
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
