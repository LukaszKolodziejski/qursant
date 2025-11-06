'use client';

import { motion } from 'framer-motion';

export default function FAQSection() {
  return (
    <section className="bg-gradient-to-b from-slate-900 to-gray-900 py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-blue-100">
              Często zadawane pytania
            </span>
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Odpowiedzi na najczęściej zadawane pytania dotyczące naszych kursów
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              question: 'Ile trwa kurs na prawo jazdy kat. B?',
              answer:
                'Kurs na prawo jazdy kategorii B składa się z 30 godzin zajęć teoretycznych oraz 30 godzin zajęć praktycznych. Całkowity czas trwania kursu zależy od indywidualnego tempa nauki, ale zwykle wynosi od 1 do 3 miesięcy.',
            },
            {
              question:
                'Jakie dokumenty są potrzebne, aby zapisać się na kurs?',
              answer:
                'Do zapisu na kurs potrzebujesz: dowodu osobistego, numeru PESEL, orzeczenia lekarskiego o braku przeciwwskazań do kierowania pojazdami, oraz zdjęcia do dokumentów. W przypadku osób niepełnoletnich wymagana jest również zgoda rodziców lub opiekunów prawnych.',
            },
            {
              question: 'Jak wygląda egzamin państwowy?',
              answer:
                'Egzamin państwowy składa się z dwóch części: teoretycznej i praktycznej. Część teoretyczna to test komputerowy składający się z pytań jednokrotnego wyboru. Część praktyczna obejmuje wykonanie zadań na placu manewrowym oraz jazdę w ruchu drogowym pod nadzorem egzaminatora.',
            },
            {
              question: 'Czy oferujecie jazdy doszkalające przed egzaminem?',
              answer:
                'Tak, oferujemy dodatkowe jazdy doszkalające dla osób, które chcą lepiej przygotować się do egzaminu praktycznego. Możesz wykupić dowolną liczbę dodatkowych godzin jazdy z instruktorem.',
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-medium text-white">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 ml-4">
                  <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-blue-100">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
