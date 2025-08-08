'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  HiOutlineCurrencyDollar,
  HiOutlineChevronDown,
  HiOutlineLightBulb,
  HiOutlineClipboardCheck,
  HiOutlinePhone,
} from 'react-icons/hi';
import { FaCar, FaGraduationCap } from 'react-icons/fa';
import Link from 'next/link';
import { CONTACT } from '@/constants/contact';
import { PRICES } from '@/constants/prices';
import AnswerBox from '@/components/seo/AnswerBox';
import StructuredData from '@/components/seo/StructuredData';
import SuggestedLinks from '@/components/seo/SuggestedLinks';

export default function PytaniaPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const toggleQuestion = (id: string) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  const sections = [
    {
      id: 'podstawowe',
      title: 'Podstawowe informacje',
      icon: <HiOutlineLightBulb className="text-blue-400" />,
      questions: [
        {
          id: 'czas-kursu',
          question: 'Jak długo trwa kurs na prawo jazdy kat. B?',
          answer:
            'Kurs składa się z 30 godzin teorii i 30 godzin praktyki. Całość można ukończyć w 1-3 miesiące w trybie standardowym lub 2-4 tygodnie w trybie ekspresowym. Teoria może być realizowana stacjonarnie lub poprzez e-learning.',
        },
        {
          id: 'wymagania',
          question: 'Jakie są wymagania, aby rozpocząć kurs?',
          answer:
            'Aby rozpocząć kurs, musisz: mieć ukończone 17 lat i 9 miesięcy, posiadać numer PKK (Profil Kandydata na Kierowcę), przejść badania lekarskie oraz dostarczyć zdjęcie do dokumentów. Pomagamy w załatwieniu wszystkich formalności.',
        },
        {
          id: 'egzaminy',
          question: 'Jak wyglądają egzaminy?',
          answer:
            'Egzamin państwowy składa się z części teoretycznej (test na komputerze, 32 pytania) i praktycznej (plac manewrowy + jazda w ruchu miejskim). Przed egzaminem państwowym przeprowadzamy egzaminy wewnętrzne, które są wliczone w cenę kursu.',
        },
        {
          id: 'pkk',
          question: 'Co to jest PKK i jak go uzyskać?',
          answer:
            'PKK (Profil Kandydata na Kierowcę) to elektroniczny dokument niezbędny do rozpoczęcia kursu. Aby go uzyskać, należy złożyć wniosek w wydziale komunikacji wraz z orzeczeniem lekarskim, zdjęciem i opłatą. Pomagamy w całym procesie uzyskania PKK - możemy przygotować wszystkie dokumenty i pokierować całą procedurą.',
        },
        {
          id: 'wiek',
          question: 'W jakim wieku mogę zacząć kurs?',
          answer:
            'Kurs można rozpocząć już w wieku 17 lat i 9 miesięcy. Egzamin teoretyczny można zdawać 3 miesiące przed 18. urodzinami, natomiast egzamin praktyczny można zdać najwcześniej w dniu 18. urodzin. Warto rozpocząć kurs wcześniej, aby być gotowym do egzaminu praktycznego zaraz po osiągnięciu pełnoletności.',
        },
      ],
    },
    {
      id: 'organizacja',
      title: 'Organizacja kursu',
      icon: <HiOutlineClipboardCheck className="text-purple-400" />,
      questions: [
        {
          id: 'harmonogram',
          question: 'Jaki jest harmonogram zajęć?',
          answer:
            'Oferujemy elastyczny harmonogram dostosowany do Twoich potrzeb. Zajęcia teoretyczne odbywają się w trybie stacjonarnym lub online. Jazdy praktyczne umawiamy indywidualnie - możesz wybrać godziny poranne, popołudniowe lub weekendowe.',
        },
        {
          id: 'miejsce',
          question: 'Gdzie odbywają się zajęcia?',
          answer:
            'Zajęcia teoretyczne odbywają się w naszej siedzibie przy ul. K. Ujejskiego 46a w Bydgoszczy. Jazdy rozpoczynamy spod szkoły lub, dla osób zamiejscowych, możemy zaczynać od PKS-u przy ul. Jagiellońskiej.',
        },
        {
          id: 'samochody',
          question: 'Jakimi samochodami prowadzone są jazdy?',
          answer:
            'Szkolimy na nowych Oplach Corsach z 2024 roku. Samochody są w pełni wyposażone w systemy bezpieczeństwa, klimatyzację oraz podwójne sterowanie. Wszystkie auta są regularnie serwisowane i utrzymane w idealnym stanie.',
        },
        {
          id: 'teoria-online',
          question: 'Jak wygląda kurs teoretyczny online?',
          answer:
            'Kurs teoretyczny online realizowany jest przez naszą platformę e-learningową. Otrzymujesz dostęp do materiałów 24/7, profesjonalnych wykładów wideo, testów i pytań egzaminacyjnych. Możesz uczyć się w swoim tempie, a w razie pytań masz stały kontakt z instruktorem poprzez czat lub telefon.',
        },
        {
          id: 'ilosc-jazd',
          question: 'Ile jazd mogę odbyć w tygodniu?',
          answer:
            'W trybie standardowym realizujemy 2-3 jazdy tygodniowo, co pozwala na lepsze przyswojenie wiedzy. W trybie ekspresowym możemy zorganizować 5-7 jazd tygodniowo. Harmonogram zawsze ustalamy indywidualnie, biorąc pod uwagę Twoje możliwości czasowe i tempo nauki.',
        },
      ],
    },
    {
      id: 'egzamin',
      title: 'Egzamin państwowy',
      icon: <FaGraduationCap className="text-yellow-400" />,
      questions: [
        {
          id: 'przebieg-teorii',
          question: 'Jak wygląda egzamin teoretyczny?',
          answer:
            'Egzamin teoretyczny składa się z 32 pytań (20 z części podstawowej i 12 specjalistycznych). Na rozwiązanie masz 25 minut. Aby zdać, trzeba udzielić minimum 68 punktów na 74 możliwe. Pytania wyświetlane są na ekranie komputera, a część z nich zawiera filmy lub animacje.',
        },
        {
          id: 'przebieg-praktyki',
          question: 'Co zawiera egzamin praktyczny?',
          answer:
            'Egzamin praktyczny trwa 40 minut i składa się z: sprawdzenia przygotowania technicznego (losowane zadanie), manewrów na placu (parkowanie prostopadłe, równoległe lub zawracanie) oraz jazdy w ruchu miejskim. Oceniane są: przygotowanie do jazdy, wykonywanie manewrów, zachowanie na drodze i technika kierowania pojazdem.',
        },
        {
          id: 'przygotowanie',
          question: 'Jak najlepiej przygotować się do egzaminu?',
          answer:
            'Oferujemy kompleksowe przygotowanie: dostęp do aktualnej bazy pytań, egzaminy próbne na naszej platformie, jazdy na trasach egzaminacyjnych, egzaminy wewnętrzne w warunkach zbliżonych do państwowych. Dodatkowo, nasi instruktorzy dzielą się praktycznymi wskazówkami i uczą technik radzenia sobie ze stresem.',
        },
        {
          id: 'zdawalnosc',
          question: 'Jaka jest zdawalność w Waszej szkole?',
          answer:
            'Nasza szkoła może pochwalić się zdawalnością na poziomie 60% za pierwszym podejściem. To wynik znacznie wyższy niż średnia krajowa. Osiągamy to dzięki indywidualnemu podejściu do kursanta, doświadczonej kadrze i kompleksowemu programowi szkolenia.',
        },
        {
          id: 'stres',
          question: 'Jak radzić sobie ze stresem podczas egzaminu?',
          answer:
            'Nasi instruktorzy uczą technik radzenia sobie ze stresem. Przeprowadzamy egzaminy wewnętrzne w warunkach zbliżonych do państwowych, co pomaga oswoić się z sytuacją egzaminacyjną. Dodatkowo, oferujemy indywidualne konsultacje i wsparcie psychologiczne dla osób szczególnie zestresowanych.',
        },
      ],
    },
    {
      id: 'platnosci',
      title: 'Płatności i formalności',
      icon: <HiOutlineCurrencyDollar className="text-green-400" />,
      questions: [
        {
          id: 'cena',
          question: 'Ile kosztuje kurs i co zawiera cena?',
          answer: `Kurs podstawowy kosztuje ${PRICES.COURSE.BASIC} zł, ekspresowy ${PRICES.COURSE.EXPRESS} zł. Cena zawiera: komplet materiałów dydaktycznych, 30h teorii, 30h praktyki, egzaminy wewnętrzne. Oferujemy możliwość płatności w 5 wygodnych ratach.`,
        },
        {
          id: 'dokumenty',
          question: 'Jakie dokumenty są potrzebne?',
          answer: `Potrzebujesz: dowód osobisty, PKK (pomagamy w uzyskaniu), orzeczenie lekarskie (możliwość wykonania u nas za ${PRICES.ADDITIONAL.MEDICAL_EXAM} zł), zdjęcie do dokumentów. Wszystkie formalności możemy załatwić podczas jednej wizyty w naszej szkole.`,
        },
        {
          id: 'dodatkowe',
          question: 'Czy są jakieś dodatkowe opłaty?',
          answer: `Poza kursem należy uwzględnić: badanie lekarskie (${PRICES.ADDITIONAL.MEDICAL_EXAM} zł), opłatę za egzamin państwowy (teoria 50 zł, praktyka 200 zł). Ewentualne jazdy doszkalające to koszt ${PRICES.ADDITIONAL.TRAINING_OWN_STUDENT} zł/h dla naszych kursantów.`,
        },
        {
          id: 'raty',
          question: 'Jak wygląda system ratalny?',
          answer: `Oferujemy dogodny system ratalny: ${PRICES.INSTALLMENTS.map(
            (rate, index) => `${rate.step} (${rate.amount} zł) - ${rate.desc}`
          ).join(
            ', '
          )}. Nie pobieramy żadnych dodatkowych opłat za rozłożenie płatności na raty.`,
        },
      ],
    },
    {
      id: 'praktyczne',
      title: 'Praktyczne aspekty',
      icon: <FaCar className="text-red-400" />,
      questions: [
        {
          id: 'pierwsze-jazdy',
          question: 'Jak wyglądają pierwsze jazdy?',
          answer:
            'Pierwsze jazdy odbywają się w spokojnych lokalizacjach, z dala od dużego ruchu. Instruktor cierpliwie wprowadza w podstawy: ruszanie, zmiana biegów, zatrzymywanie. Stopniowo przechodzimy do bardziej zaawansowanych manewrów i jazdy w ruchu miejskim. Tempo nauki dostosowujemy do indywidualnych predyspozycji.',
        },
        {
          id: 'niepowodzenie',
          question: 'Co w przypadku niepowodzenia na egzaminie?',
          answer: `W przypadku niepowodzenia oferujemy jazdy doszkalające w promocyjnej cenie ${PRICES.ADDITIONAL.TRAINING_OWN_STUDENT} zł/h dla naszych kursantów. Analizujemy błędy z egzaminu i skupiamy się na elementach wymagających poprawy. Pomagamy również w organizacji kolejnego terminu egzaminu.`,
        },
        {
          id: 'przerwa',
          question: 'Czy mogę zrobić przerwę w kursie?',
          answer:
            'Tak, rozumiemy, że mogą pojawić się różne sytuacje życiowe. Kurs można przerwać i wznowić w dogodnym momencie. Elastycznie podchodzimy do takich sytuacji, a wszystkie zrealizowane godziny zostają zachowane.',
        },
        {
          id: 'instruktor',
          question: 'Czy mogę zmienić instruktora?',
          answer:
            'Tak, jeśli czujesz, że potrzebujesz zmiany instruktora, wystarczy zgłosić to w biurze. Nie wiąże się to z żadnymi dodatkowymi opłatami. Zależy nam, abyś czuł się komfortowo podczas nauki i osiągał jak najlepsze efekty.',
        },
      ],
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      <AnswerBox
        title="Szybka odpowiedź"
        text="Znajdziesz tu odpowiedzi na najczęstsze pytania o kurs kat. B: czas trwania, wymagania, egzaminy i koszty. Jeśli czegoś brakuje, skontaktuj się z nami."
      />
      {/* FAQ JSON-LD for PAA/FAQ rich results */}
      <StructuredData
        id="faqpage-jsonld"
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: sections.flatMap((section) =>
            section.questions.map((q) => ({
              '@type': 'Question',
              name: q.question,
              acceptedAnswer: { '@type': 'Answer', text: q.answer },
            }))
          ),
        }}
      />
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                Często zadawane pytania
              </span>
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące kursu
              na prawo jazdy
            </p>
          </motion.div>

          {/* Sekcje pytań */}
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section) => (
              <motion.div
                key={section.id}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-blue-500/20 overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center">
                    <div className="p-3 bg-white/5 rounded-lg mr-4">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-semibold text-white">
                      {section.title}
                    </h2>
                  </div>
                  <motion.div
                    animate={{ rotate: openSection === section.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HiOutlineChevronDown className="text-2xl text-blue-300" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openSection === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-6"
                    >
                      <div className="space-y-4">
                        {section.questions.map((q) => (
                          <div
                            key={q.id}
                            className="border-t border-blue-500/10 pt-4"
                          >
                            <button
                              onClick={() => toggleQuestion(q.id)}
                              className="w-full flex items-center justify-between text-left"
                            >
                              <h3 className="text-lg font-medium text-blue-200">
                                {q.question}
                              </h3>
                              <motion.div
                                animate={{
                                  rotate: openQuestion === q.id ? 180 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <HiOutlineChevronDown className="text-xl text-blue-300" />
                              </motion.div>
                            </button>

                            <AnimatePresence>
                              {openQuestion === q.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-4"
                                >
                                  <p className="text-blue-200">{q.answer}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sekcja kontaktowa */}
      <section className="relative py-16 bg-gradient-to-b from-indigo-950 to-blue-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Nie znalazłeś odpowiedzi na swoje pytanie?
            </h2>
            <p className="text-blue-200 mb-8">
              Skontaktuj się z nami - chętnie odpowiemy na wszystkie Twoje
              pytania
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Napisz do nas
                <HiOutlinePhone className="ml-2" />
              </Link>
              <a
                href={`tel:${CONTACT.PHONE_RAW}`}
                className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300"
              >
                Zadzwoń: {CONTACT.PHONE}
                <HiOutlinePhone className="ml-2" />
              </a>
              <a
                href={`tel:${CONTACT.PHONE_2_RAW}`}
                className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300"
              >
                Lub: {CONTACT.PHONE_2}
                <HiOutlinePhone className="ml-2" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-12 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-6">
          <SuggestedLinks currentPath="/pytania" heading="Powiązane strony" />
        </div>
      </section>
    </div>
  );
}
