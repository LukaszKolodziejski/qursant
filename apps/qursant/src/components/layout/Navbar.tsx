'use client';

// ⚡⚡⚡ ULTRA PERFORMANCE OPTIMIZED ⚡⚡⚡
// - ZERO Framer Motion (było 8x motion components!)
// - Pure CSS animations & transitions
// - Oszczędność: ~100KB JavaScript w layout!

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();

  // Track mount for CSS animations
  useEffect(() => {
    setMounted(true);
  }, []);

  const navigation = [
    { name: 'Strona główna', href: '/' },
    { name: 'O nas', href: '/o-nas' },
    { name: 'Kursy', href: '/kursy' },
    { name: 'Galeria', href: '/galeria' },
    { name: 'Blog', href: '/blog' },
    { name: 'Cennik', href: '/cennik' },
    { name: 'Pytania', href: '/pytania' },
    { name: 'Rezerwacja', href: '/rezerwacja' },
    { name: 'Kontakt', href: '/kontakt' },
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
    <nav
      style={{ height: scrolled ? '5rem' : '6rem' }}
      className={`fixed w-full z-50 transition-all duration-300 pt-5 bg-gray-900 shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          {/* Logo - CSS Animation: fade-in (only on mount) */}
          <div className={mounted ? 'animate-fade-in' : 'opacity-0'}>
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
                quality={60}
                className="transition-all duration-300"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu - CSS hover:scale */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => (
              <div key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isActivePath(item.href)
                      ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button - CSS active:scale */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 mr-4 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 z-50 active:scale-95 transition-transform duration-150"
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
          </button>
        </div>
      </div>

      {/* Mobile Menu - CSS transitions instead of Framer Motion */}
      {isMenuOpen && (
        <>
          {/* Overlay - CSS fade */}
          <div
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black opacity-50 z-40 animate-fade-in"
          />

          {/* Menu mobilne - CSS slide from right */}
          <div className="fixed top-0 right-0 w-[300px] h-full bg-gray-900 shadow-xl z-50 animate-fade-in-right">
            <div className="px-4 pt-20 pb-6 space-y-1">
              {navigation.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActivePath(item.href)
                        ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
