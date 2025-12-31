'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useReservationCounter } from '@/hooks/useReservationCounter';
import { getExperienceYears } from '@/constants/stats';

// ===================================================================
// 🎬 VIDEO HERO SECTION - Powrót filmiku w tle!
// - Wideo w tle odtwarza się automatycznie
// - Fallback do gradientu podczas ładowania
// - Pure CSS animations (lekkie animacje bez Framer Motion)
// ===================================================================

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { remainingPlaces, monthName } = useReservationCounter();

  useEffect(() => {
    if (!videoRef?.current) {
      return;
    }

    const handleVideoLoaded = () => {
      setIsVideoLoaded(true);
    };

    const currentVideo = videoRef.current;
    currentVideo.addEventListener('loadeddata', handleVideoLoaded);

    // Fallback - jeśli wideo nie załaduje się w 3s, pokaż gradient
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
  }, [isVideoLoaded]);

  return (
    <section
      data-homepage
      className="relative w-full min-h-screen overflow-x-hidden"
    >
      {/* 🎬 VIDEO BACKGROUND */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/80 to-purple-900/70 z-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(67,56,202,0.4),transparent_50%)] z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.4),transparent_50%)] z-10"></div>

        {/* Video element */}
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

        {/* Loading fallback */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 flex items-center justify-center text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
          </div>
        )}
      </div>

      <div className="relative z-30 w-full max-w-[100vw] overflow-x-hidden">
        <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 text-center text-white">
          <div className="w-full max-w-4xl mx-auto">
            {/* Badge with CSS animation */}
            <div className="mb-8 md:mb-6 mt-2 sm:mt-0 animate-fade-in-up">
              <div className="inline-block px-4 py-2 md:px-6 md:py-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-xs md:text-sm font-medium animate-gradient-shift">
                Prawo jazdy w 2 miesiące!
              </div>
            </div>

            {/* Main heading */}
            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 md:mb-6 break-words animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Qursant
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mt-2 md:mt-4 text-2xl sm:text-3xl md:text-5xl">
                Profesjonalne kursy prawa jazdy kategorii B
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="mt-4 md:mt-6 text-lg sm:text-xl md:text-2xl leading-8 text-blue-100 max-w-2xl mx-auto break-words animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              Najwyższa zdawalność w Bydgoszczy od {getExperienceYears()} lat
            </p>

            {/* CTA Buttons */}
            <div
              className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
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
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-45 animate-shine" />
              </Link>

              <Link
                href="/kursy"
                className="w-full sm:w-auto group relative overflow-hidden rounded-full backdrop-blur-md bg-white/10 border border-white/20 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
              >
                <span className="relative z-10">Sprawdź kursy</span>
                <span className="block text-xs md:text-sm mt-0.5 md:mt-1 opacity-90">
                  Ceny promocyjne do końca miesiąca
                </span>
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden sm:block animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            <div className="flex flex-col items-center">
              <span className="text-sm text-white/80 mb-2">Przewiń w dół</span>
              <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center p-1">
                <div className="w-1 h-2 bg-white rounded-full animate-bounce-slow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
