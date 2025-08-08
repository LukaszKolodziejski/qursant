'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  const navigation = [
    { name: 'Strona główna', href: '/' },
    { name: 'Kursy', href: '/kursy' },
    { name: 'Cennik', href: '/cennik' },
    { name: 'Poradnik', href: '/poradnik' },
    { name: 'Galeria', href: '/galeria' },
    { name: 'Pytania', href: '/pytania' },
    { name: 'Kontakt', href: '/kontakt' },
    { name: 'Rezerwacja', href: '/rezerwacja' },
  ];

  // Blokowanie scrollowania gdy menu jest otwarte
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Obsługa scrollowania
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrolled(currentScrollPos > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Funkcja pomocnicza do sprawdzania aktywnej ścieżki
  const isActivePath = (path: string) => {
    return path === '/' ? pathname === '/' : pathname === path;
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{
        height: scrolled ? '5rem' : '6rem',
      }}
      transition={{ duration: 0.3 }}
      className={`fixed w-full z-50 transition-all duration-300 pt-5 bg-gray-900 shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="flex-shrink-0 flex items-center"
              aria-label="Strona główna"
            >
              <Image
                src="/logo/logo.png"
                alt="Qursant Logo"
                width={scrolled ? 100 : 120}
                height={scrolled ? 33 : 40}
                className="transition-all duration-300"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Link
                  href={item.href}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActivePath(item.href)
                      ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 mr-4 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 z-50"
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu z overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay do zamykania menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Menu mobilne */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 w-[300px] h-full bg-gray-900 shadow-xl z-50"
            >
              <div className="px-4 pt-20 pb-6 space-y-1">
                {navigation.map((item) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 rounded-xl text-base font-medium ${
                        isActivePath(item.href)
                          ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
