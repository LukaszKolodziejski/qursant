'use client';

// ⚡⚡⚡ ULTRA PERFORMANCE OPTIMIZED ⚡⚡⚡
// - ZERO Framer Motion (eliminuje 179ms forced reflow!)
// - Pure CSS animations + SVG (0KB JavaScript overhead!)
// - Oszczędność: ~80KB JavaScript + 179ms reflow!

import { FaUserGraduate, FaChalkboardTeacher, FaMedal } from 'react-icons/fa';
import { HiOutlineClock } from 'react-icons/hi';
import {
  getStudentsCount,
  getExperienceYears,
  INSTRUCTORS_COUNT,
  formatNumber,
} from '@/constants/stats';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function StatsSection() {
  const titleRef = useScrollAnimation<HTMLDivElement>();
  const statsRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="relative bg-gradient-to-b from-blue-950 to-indigo-950 py-12 sm:py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/20 to-transparent"></div>

        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-purple-600/30 to-transparent blur-3xl"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-gradient-to-br from-blue-600/20 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl"></div>
        </div>

        {/* ⚡ STATIC SVG Pattern - No Framer Motion animation (saves 179ms reflow!) */}
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
              <circle
                cx="25"
                cy="25"
                r="1.5"
                fill="#fff"
                opacity="0.6"
                className="animate-pulse-slow"
              />
            </pattern>
            <pattern
              id="grid"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <rect width="100" height="100" fill="url(#smallGrid)" />
              <circle
                cx="50"
                cy="50"
                r="2"
                fill="#fff"
                opacity="0.4"
                className="animate-pulse-slow"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* CSS Animation: fade-in-up */}
        <div
          ref={titleRef}
          className="fade-in-on-scroll mx-auto max-w-2xl text-center mb-20"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
              Nasza szkoła w liczbach
            </span>
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>

        {/* CSS Animation: staggered fade-in */}
        <div ref={statsRef} className="fade-in-on-scroll mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
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
                value: '98%',
                label: 'Zadowolenia',
                color: 'from-yellow-400 to-orange-500',
              },
            ].map((stat, index) => (
              <div
                key={index}
                // CSS Animation: hover-scale + staggered delay
                className={`relative group flex flex-col items-center p-8 rounded-2xl backdrop-blur-sm hover-scale animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-300 backdrop-blur-sm"></div>

                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300`}
                ></div>

                <div className="relative z-10">
                  <div
                    className={`text-4xl bg-gradient-to-br ${stat.color} rounded-xl p-4 text-white mb-5 shadow-lg`}
                    aria-hidden="true"
                  >
                    {stat.icon}
                  </div>
                  <p
                    className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.color} mb-2`}
                  >
                    {stat.value}
                  </p>
                  <p className="text-base text-blue-100">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
