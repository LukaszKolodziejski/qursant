'use client';

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import {
  FaCar,
  FaUsers,
  FaBuilding,
  FaGraduationCap,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { HiOutlineCamera } from 'react-icons/hi';

type ImageCategory =
  | 'samochody'
  | 'instruktorzy'
  | 'siedziba'
  | 'kursy'
  | 'wszystkie';

interface GalleryImage {
  src: string;
  alt: string;
  category: ImageCategory;
  width: number;
  height: number;
  orientation: 'horizontal' | 'vertical';
  description?: string;
}

// Lista zdjęć
const images: GalleryImage[] = [
  // Zdjęcia poziome
  {
    src: '/images/photo-1.jpg',
    alt: 'Toyota Yaris - Nasz Najnowszy Nabytek',
    category: 'samochody',
    width: 1920,
    height: 1080,
    orientation: 'horizontal',
    description:
      'Nowoczesny samochód szkoleniowy wyposażony w zaawansowane systemy bezpieczeństwa',
  },
  {
    src: '/images/photo-2.jpg',
    alt: 'Instruktor Robert podczas szkolenia',
    category: 'instruktorzy',
    width: 1920,
    height: 1080,
    orientation: 'horizontal',
    description: 'Profesjonalne podejście i wieloletnie doświadczenie',
  },
  {
    src: '/images/photo-78.jpg',
    alt: 'Flota szkoleniowa Qursant',
    category: 'samochody',
    width: 1920,
    height: 1080,
    orientation: 'horizontal',
    description: 'Nowoczesna flota pojazdów szkoleniowych',
  },
  {
    src: '/images/photo-15.jpg',
    alt: 'Egzamin praktyczny',
    category: 'kursy',
    width: 1920,
    height: 1080,
    orientation: 'horizontal',
    description: 'Przygotowanie do egzaminu w realnych warunkach',
  },
  // Zdjęcia pionowe
  {
    src: '/images/photo-3.jpg',
    alt: 'Nasza siedziba w centrum Bydgoszczy',
    category: 'siedziba',
    width: 1080,
    height: 1920,
    orientation: 'vertical',
    description: 'Nowoczesna siedziba z komfortową salą wykładową',
  },
  {
    src: '/images/photo-4.jpg',
    alt: 'Zajęcia teoretyczne',
    category: 'kursy',
    width: 1080,
    height: 1920,
    orientation: 'vertical',
    description: 'Profesjonalne szkolenie teoretyczne',
  },
  {
    src: '/images/photo-5.jpg',
    alt: 'Instruktor Anna podczas wykładu',
    category: 'instruktorzy',
    width: 1080,
    height: 1920,
    orientation: 'vertical',
    description: 'Doświadczona kadra instruktorska',
  },
  {
    src: '/images/photo-6.jpg',
    alt: 'Sala egzaminacyjna',
    category: 'siedziba',
    width: 1080,
    height: 1920,
    orientation: 'vertical',
    description: 'Profesjonalnie wyposażona sala egzaminacyjna',
  },
];

export default function GaleriaPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<ImageCategory>('wszystkie');
  const [horizontalSlideIndex, setHorizontalSlideIndex] = useState(0);
  const [verticalSlideIndex, setVerticalSlideIndex] = useState(0);
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

  // Filtrowanie zdjęć
  const filteredImages = images.filter(
    (img) =>
      selectedCategory === 'wszystkie' || img.category === selectedCategory
  );
  const horizontalImages = images.filter(
    (img) => img.orientation === 'horizontal'
  );
  const verticalImages = images.filter((img) => img.orientation === 'vertical');

  useEffect(() => {
    setIsLoaded(true);
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
      setVerticalSlideIndex((prev) =>
        prev === verticalImages.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => {
      clearInterval(horizontalInterval);
      clearInterval(verticalInterval);
    };
  }, [horizontalImages.length, verticalImages.length, isLoaded]);

  // Kategorie z ikonami
  const categories = [
    {
      id: 'wszystkie',
      name: 'Wszystkie',
      icon: <HiOutlineCamera className="text-xl" />,
    },
    { id: 'samochody', name: 'Samochody', icon: <FaCar className="text-xl" /> },
    {
      id: 'instruktorzy',
      name: 'Instruktorzy',
      icon: <FaUsers className="text-xl" />,
    },
    {
      id: 'siedziba',
      name: 'Siedziba',
      icon: <FaBuilding className="text-xl" />,
    },
    {
      id: 'kursy',
      name: 'Kursy',
      icon: <FaGraduationCap className="text-xl" />,
    },
  ];

  // Nawigacja karuzeli
  const navigateHorizontal = (direction: 'prev' | 'next') => {
    setHorizontalSlideIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? horizontalImages.length - 1 : prev - 1;
      }
      return prev === horizontalImages.length - 1 ? 0 : prev + 1;
    });
  };

  const navigateVertical = (direction: 'prev' | 'next') => {
    setVerticalSlideIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? verticalImages.length - 1 : prev - 1;
      }
      return prev === verticalImages.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-indigo-900"
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
            className="relative w-full h-[70vh] overflow-hidden rounded-2xl"
          >
            <AnimatePresence mode="wait">
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
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-8 left-8 max-w-xl"
                >
                  <h3 className="text-4xl font-bold text-white mb-4">
                    {horizontalImages[horizontalSlideIndex].alt}
                  </h3>
                  <p className="text-xl text-white/90">
                    {horizontalImages[horizontalSlideIndex].description}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Przyciski nawigacji */}
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

            {/* Wskaźniki slajdów */}
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
          </motion.div>
        </div>
      </section>

      {/* Karuzela ze zdjęciami pionowymi */}
      <section className="relative py-12 overflow-hidden bg-gradient-to-b from-blue-900 to-indigo-900">
        <div className="container mx-auto px-6">
          <motion.div
            ref={verticalSliderRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="wait">
              {[0, 1, 2].map((offset) => {
                const index =
                  (verticalSlideIndex + offset) % verticalImages.length;
                return (
                  <motion.div
                    key={`${index}-${offset}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: offset * 0.2 }}
                    className="relative h-[600px] rounded-2xl overflow-hidden group"
                  >
                    <Image
                      src={verticalImages[index].src}
                      alt={verticalImages[index].alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + offset * 0.2 }}
                      className="absolute bottom-8 left-8 right-8"
                    >
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {verticalImages[index].alt}
                      </h3>
                      <p className="text-white/90">
                        {verticalImages[index].description}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Przyciski nawigacji */}
          <div className="flex justify-center mt-12 space-x-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => navigateVertical('prev')}
              className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white transition-all duration-300 border border-white/20 flex items-center"
            >
              <FaChevronLeft className="mr-2" />
              Poprzedni
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => navigateVertical('next')}
              className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white transition-all duration-300 border border-white/20 flex items-center"
            >
              Następny
              <FaChevronRight className="ml-2" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Filtry kategorii */}
      <section className="relative py-12 bg-gradient-to-b from-indigo-900 to-purple-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() =>
                  setSelectedCategory(category.id as ImageCategory)
                }
                className={`flex items-center px-8 py-4 rounded-full backdrop-blur-md transition-all duration-500 ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-blue-200 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <span className="mr-3">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Siatka wszystkich zdjęć */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="wait">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.src}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-bold mb-2">{image.alt}</h3>
                    <p className="text-sm text-white/90">{image.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
