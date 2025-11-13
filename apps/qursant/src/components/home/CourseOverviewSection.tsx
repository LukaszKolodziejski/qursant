'use client';

// ⚡⚡⚡ ULTRA PERFORMANCE OPTIMIZED ⚡⚡⚡
// - ZERO Framer Motion
// - Pure CSS animations
// - Oszczędność: ~100KB JavaScript!

import Link from 'next/link';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { FaCar, FaMedal } from 'react-icons/fa';

export default function CourseOverviewSection() {
  return (
    <section className="bg-gradient-to-b from-purple-950 to-indigo-950 py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.1),transparent_70%)]"></div>
        <div className="absolute -right-40 top-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-40 bottom-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* CSS Animation: fade-in-up-20 */}
        <div className="text-center mb-16 animate-fade-in-up-20">
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
        </div>

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
            // CSS Animation: staggered fade-in-up-20 with inline delay
            <div
              key={index}
              className="relative p-8 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group animate-fade-in-up-20"
              style={{ animationDelay: `${index * 0.1}s` }}
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

              {/* CSS hover - width animation */}
              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* CSS Animation: fade-in-up-20 with delay */}
        <div className="text-center mt-12 animate-fade-in-up-20 delay-300">
          <Link
            href="/cennik"
            className="group relative overflow-hidden rounded-full backdrop-blur-md bg-white/10 border border-white/20 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 inline-block"
          >
            <span className="relative z-10">Zobacz kursy</span>
            {/* CSS hover - scale effect */}
            <span className="absolute inset-0 bg-white/20 z-0 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}
