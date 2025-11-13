'use client';

// ⚡⚡⚡ ULTRA PERFORMANCE OPTIMIZED ⚡⚡⚡
// - ZERO Framer Motion
// - Pure CSS animations
// - Oszczędność: ~100KB JavaScript!

import Link from 'next/link';
import {
  HiOutlineLocationMarker,
  HiOutlineUserGroup,
  HiOutlineClock,
  HiOutlineCheckCircle,
} from 'react-icons/hi';

export default function LocalSEOSection() {
  const areas = [
    'Śródmieście',
    'Wzgórze Wolności',
    'Kapuściska',
    'Bielawy',
    'Fordon',
    'Osowa Góra',
    'Jachcice',
    'Bartodzieje',
  ];

  return (
    <section className="relative bg-gradient-to-b from-indigo-950 to-blue-950 py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main heading - CSS Animation: fade-in-up-20 */}
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in-up-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
              Szkoła Jazdy Qursant w Bydgoszczy
            </span>
          </h2>
          <div className="w-32 h-1 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-8"></div>
        </div>

        {/* Content section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left column - CSS Animation: fade-in-left */}
          <div className="space-y-6 animate-fade-in-left">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <HiOutlineLocationMarker className="text-blue-400 mr-3 text-3xl" />
                Profesjonalna Szkoła Jazdy w Bydgoszczy
              </h3>
              <p className="text-blue-100 leading-relaxed mb-4">
                Szkoła Jazdy Qursant to jedna z najbardziej doświadczonych szkół
                jazdy w Bydgoszczy. Od 2009 roku kształcimy przyszłych
                kierowców, oferując kompleksowe kursy prawa jazdy kategorii B.
                Nasza siedziba przy ul. Ujejskiego 46a na Wzgórzu Wolności
                zapewnia dogodny dostęp dla mieszkańców wszystkich dzielnic
                Bydgoszczy.
              </p>
              <p className="text-blue-100 leading-relaxed mb-4">
                Oferujemy zarówno standardowe kursy prawa jazdy, jak i szkolenia
                ekspresowe, dostosowane do indywidualnych potrzeb kursantów.
                Nauka jazdy w Bydgoszczy z Qursant to gwarancja profesjonalizmu,
                wysokiej zdawalności egzaminów państwowych oraz nowoczesnego
                podejścia do szkolenia kierowców.
              </p>
              <p className="text-blue-100 leading-relaxed">
                Nasi doświadczeni instruktorzy nauki jazdy w Bydgoszczy prowadzą
                zajęcia praktyczne na najnowszych Oplach Corsach z 2024 roku,
                zapewniając komfort i bezpieczeństwo podczas każdej jazdy.
                Zajęcia teoretyczne odbywają się w klimatyzowanej sali
                wykładowej wyposażonej w nowoczesny sprzęt multimedialny.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <HiOutlineCheckCircle className="text-yellow-400 mr-3 text-3xl" />
                Dlaczego warto wybrać Qursant?
              </h3>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2 mt-1">✓</span>
                  <span>
                    <strong className="text-white">Wysoka zdawalność:</strong>{' '}
                    60% naszych kursantów zdaje egzamin praktyczny za pierwszym
                    razem - to wynik znacznie powyżej średniej w Bydgoszczy
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2 mt-1">✓</span>
                  <span>
                    <strong className="text-white">
                      Doświadczeni instruktorzy:
                    </strong>{' '}
                    Nasz zespół to instruktorzy z wieloletnim stażem, w tym
                    egzaminatorzy WORD Bydgoszcz
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2 mt-1">✓</span>
                  <span>
                    <strong className="text-white">Nowoczesna flota:</strong>{' '}
                    Uczymy na nowych samochodach marki Opel Corsa z pełnym
                    wyposażeniem bezpieczeństwa
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2 mt-1">✓</span>
                  <span>
                    <strong className="text-white">Elastyczne terminy:</strong>{' '}
                    Dopasowujemy harmonogram jazd do Twojego trybu życia
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2 mt-1">✓</span>
                  <span>
                    <strong className="text-white">Przejrzyste ceny:</strong>{' '}
                    Bez ukrytych kosztów, możliwość płatności w ratach
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right column - CSS Animation: fade-in-right */}
          <div className="space-y-6 animate-fade-in-right">
            {/* Areas served */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <HiOutlineLocationMarker className="text-blue-400 mr-3 text-3xl" />
                Obsługujemy całą Bydgoszcz
              </h3>
              <p className="text-blue-100 mb-6">
                Dla Twojej wygody oferujemy odbiór i dowóz na zajęcia praktyczne
                w następujących dzielnicach Bydgoszczy:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {areas.map((area, index) => (
                  // CSS Animation: staggered scale-in-90 with inline delay
                  <div
                    key={area}
                    className="bg-blue-500/10 rounded-lg p-3 text-center animate-scale-in-90"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <span className="text-blue-200 font-medium">{area}</span>
                  </div>
                ))}
              </div>
              <p className="text-blue-100 mt-6 text-sm">
                Dla osób zamiejscowych możliwość rozpoczęcia jazd od dworca PKS
                przy ul. Jagiellońskiej
              </p>
            </div>

            {/* Info boxes */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <HiOutlineClock className="text-purple-400 mr-3 text-3xl" />
                Jak długo trwa kurs?
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-white font-semibold mb-2">
                    🚗 Tryb standardowy
                  </p>
                  <p className="text-blue-100">
                    Kurs prawa jazdy kat. B w Bydgoszczy trwa średnio 2-3
                    miesiące. Obejmuje 30 godzin teorii oraz 30 godzin praktyki.
                    Idealny dla osób, które chcą dokładnie poznać wszystkie
                    aspekty bezpiecznej jazdy.
                  </p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-2">
                    ⚡ Tryb ekspresowy
                  </p>
                  <p className="text-blue-100">
                    Dla osób, które mają pilną potrzebę zdobycia prawa jazdy,
                    oferujemy kurs ekspresowy. Dzięki intensywnym zajęciom (5-7
                    jazd tygodniowo) możesz ukończyć kurs w 4-6 tygodni.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <HiOutlineUserGroup className="text-emerald-400 mr-3 text-3xl" />
                Ośrodek Szkolenia Kierowców
              </h3>
              <p className="text-blue-100 mb-4">
                Szkoła Jazdy Qursant to licencjonowany ośrodek szkolenia
                kierowców (OSK) w Bydgoszczy, który spełnia wszystkie wymogi
                prawne i jakościowe określone przez WORD. Nasze szkolenia są
                prowadzone zgodnie z najnowszym programem nauczania, co
                gwarantuje kompleksowe przygotowanie do egzaminu państwowego.
              </p>
              <Link
                href="/rezerwacja"
                className="inline-flex items-center justify-center w-full px-6 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Zarezerwuj miejsce na kursie
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA - CSS Animation: fade-in-up-20 with delay */}
        <div className="max-w-4xl mx-auto mt-16 animate-fade-in-up-20 delay-300">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Poszukujesz najlepszej szkoły jazdy w Bydgoszczy?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Nie szukaj dalej! Szkoła Jazdy Qursant to gwarancja najwyższej
              jakości szkoleń, profesjonalnych instruktorów oraz wysokiej
              zdawalności egzaminów. Sprawdź nasze ceny i dostępne terminy
              kursów.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cennik"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300"
              >
                Zobacz cennik
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300"
              >
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
