'use client';

// ✅ OPTIMIZED: CSS Animations instead of Framer Motion
// Oszczędność: ~65KB JavaScript!

import Image from 'next/image';
import { FaCar } from 'react-icons/fa';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function FleetSection() {
  const titleRef = useScrollAnimation<HTMLDivElement>();
  const imageRef = useScrollAnimation<HTMLDivElement>();
  const contentRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="relative bg-gradient-to-b from-indigo-900 to-blue-950 py-12 sm:py-16 md:py-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.2),transparent_60%)]"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6">
        {/* CSS Animation: fade-in-up */}
        <div
          ref={titleRef}
          className="fade-in-on-scroll text-center mb-8 sm:mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-100">
              Nowoczesna flota
            </span>
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Ucz się prowadzić na najnowszych modelach pojazdów wyposażonych w
            zaawansowane systemy bezpieczeństwa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* CSS Animation: fade-in-left */}
          <div ref={imageRef} className="fade-in-on-scroll relative w-full">
            <Image
              src="/images/cars/photo-77.webp"
              alt="Nowoczesna flota"
              width={1280}
              height={720}
              className="w-full h-auto rounded-2xl"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-transparent rounded-2xl"></div>
          </div>

          {/* CSS Animation: fade-in-right */}
          <div ref={contentRef} className="fade-in-on-scroll">
            <div className="space-y-6">
              {[
                {
                  title: 'Bezpieczna nauka',
                  description:
                    'Wszystkie nasze pojazdy są wyposażone w systemy wspomagające naukę jazdy',
                  icon: <FaCar className="text-blue-400" />,
                },
                {
                  title: 'Komfortowe wnętrze',
                  description:
                    'Klimatyzowane pojazdy zapewniające komfort podczas każdej lekcji',
                  icon: <FaCar className="text-purple-400" />,
                },
                {
                  title: 'Podwójne sterowanie',
                  description:
                    'Instruktor zawsze może przejąć kontrolę w sytuacji zagrożenia',
                  icon: <FaCar className="text-pink-400" />,
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  // CSS Animation: hover-scale + staggered delay
                  className={`flex p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover-scale-sm hover:bg-white/10 animate-fade-in-up delay-${
                    (index + 1) * 100
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-2xl mr-4">{feature.icon}</div>
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {feature.title}
                    </h3>
                    <p className="text-blue-200">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
