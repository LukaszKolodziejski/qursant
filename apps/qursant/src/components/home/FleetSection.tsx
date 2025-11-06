'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaCar } from 'react-icons/fa';

export default function FleetSection() {
  return (
    <section className="relative bg-gradient-to-b from-indigo-900 to-blue-950 py-12 sm:py-16 md:py-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.2),transparent_60%)]"></div>
      </div>
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative w-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/cars/photo-77.jpg"
              alt="Nowoczesna flota"
              width={1280}
              height={720}
              className="w-full h-auto rounded-2xl"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-transparent rounded-2xl"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
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
                <motion.div
                  key={index}
                  className="flex p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="text-2xl mr-4">{feature.icon}</div>
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {feature.title}
                    </h3>
                    <p className="text-blue-200">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
