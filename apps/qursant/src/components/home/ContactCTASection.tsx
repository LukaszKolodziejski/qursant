'use client';

// ⚡⚡⚡ ULTRA PERFORMANCE OPTIMIZED ⚡⚡⚡
// - ZERO Framer Motion
// - Pure CSS animations
// - Oszczędność: ~100KB JavaScript!

import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineUserGroup } from 'react-icons/hi';

export default function ContactCTASection() {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* CSS Animation: scale-in-90 */}
        <div className="rounded-3xl bg-gradient-to-br from-blue-900 to-indigo-900 overflow-hidden shadow-2xl shadow-blue-500/20 animate-scale-in-90">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-16">
              {/* CSS Animation: fade-in-up-20 */}
              <div className="animate-fade-in-up-20">
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
                    // CSS Animation: staggered fade-in-left with inline delay
                    <li
                      key={index}
                      className="flex items-center text-blue-100 animate-fade-in-left"
                      style={{ animationDelay: `${index * 0.1}s` }}
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
                    </li>
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
              </div>
            </div>
            <div className="relative hidden lg:block">
              <Image
                src="/images/course/photo-20.webp"
                alt="Szkolenie na prawo jazdy"
                width={1280}
                height={720}
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent"></div>

              {/* CSS Animation: fade-in-up-20 with delay */}
              <div className="absolute top-16 right-16 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl w-64 animate-fade-in-up-20 delay-300">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg mr-4">
                    <HiOutlineUserGroup className="text-blue-300 text-2xl" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Małe grupy</p>
                    <p className="text-blue-200 text-sm">
                      Indywidualne podejście
                    </p>
                  </div>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-4"></div>
                <p className="text-blue-100 text-sm">
                  Szkolimy w małych grupach, aby zapewnić każdemu uczestnikowi
                  indywidualne podejście i maksymalną efektywność nauki.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
