'use client';

import { motion } from 'framer-motion';
import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineClock,
  HiOutlineLocationMarker,
} from 'react-icons/hi';
import dynamic from 'next/dynamic';
import StructuredData from '@/components/seo/StructuredData';
import { withUtm } from '@/lib/utm';
import { gaEvent } from '@/lib/ga';
import AnswerBox from '@/components/seo/AnswerBox';

// Dynamiczne importowanie mapy, żeby uniknąć problemów z SSR
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-white/5 rounded-2xl animate-pulse"></div>
  ),
});

export default function KontaktPage() {
  const googleMapsUrl =
    'https://www.google.pl/maps/place/Szko%C5%82a+Jazdy+Qursant/@53.1133239,18.0069507,15z/data=!4m6!3m5!1s0x4703139b5c5a0f71:0x3da35ada0e7720b8!8m2!3d53.1114435!4d18.016832!16s%2Fg%2F1tgb619c!5m1!1e4?entry=ttu';
  const googleMapsUrlWithUtm = withUtm(googleMapsUrl, {
    utm_source: 'website',
    utm_medium: 'organic',
    utm_campaign: 'gbp',
  });

  const coordinates = {
    lat: 53.1114435,
    lng: 18.016832,
  };

  return (
    <div className="min-h-screen">
      <StructuredData
        id="contact-localbusiness-jsonld"
        data={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': 'https://www.qursant.com.pl#local',
          url: 'https://www.qursant.com.pl/kontakt',
          name: 'Szkoła Jazdy Qursant',
          image: 'https://www.qursant.com.pl/logo/logo.png',
          telephone: '+48600354556',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'ul. Ujejskiego 46a',
            addressLocality: 'Bydgoszcz',
            postalCode: '85-168',
            addressCountry: 'PL',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 53.1114435,
            longitude: 18.016832,
          },
        }}
      />
      <AnswerBox
        title="Szybka odpowiedź"
        text="Skontaktuj się z nami telefonicznie, mailowo lub odwiedź biuro przy ul. Ujejskiego 46a w Bydgoszczy. Kliknij w mapę, aby otworzyć nawigację."
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
                Kontakt
              </span>
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Skontaktuj się z nami lub odwiedź nas osobiście
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Informacje kontaktowe */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Godziny otwarcia */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <HiOutlineClock className="text-2xl text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">
                    Godziny otwarcia
                  </h2>
                </div>
                <div className="space-y-2 text-blue-200">
                  <p>Poniedziałek - Piątek: 15:00 - 17:00</p>
                  <p>Sobota: 9:00 - 11:00</p>
                </div>
              </div>

              {/* Adres */}
              <motion.div
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  gaEvent('gbp_click', { location: 'kontakt_address_card' });
                  window.open(googleMapsUrlWithUtm, '_blank');
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <HiOutlineLocationMarker className="text-2xl text-purple-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Adres</h2>
                </div>
                <div className="space-y-2 text-blue-200">
                  <p>ul. Ujejskiego 46a - pawilon</p>
                  <p>85-168 Bydgoszcz</p>
                  <p>Wzgórze Wolności</p>
                </div>
              </motion.div>

              {/* Kontakt */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-emerald-500/20 rounded-lg">
                    <HiOutlinePhone className="text-2xl text-emerald-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Kontakt</h2>
                </div>
                <div className="space-y-4">
                  <a
                    href="tel:600354556"
                    className="flex items-center text-blue-200 hover:text-blue-100 transition-colors"
                  >
                    <HiOutlinePhone className="mr-2" />
                    600 354 556
                  </a>
                  <a
                    href="tel:668302352"
                    className="flex items-center text-blue-200 hover:text-blue-100 transition-colors"
                  >
                    <HiOutlinePhone className="mr-2" />
                    668 302 352
                  </a>
                  <a
                    href="mailto:langer.biuro@poczta.fm"
                    className="flex items-center text-blue-200 hover:text-blue-100 transition-colors"
                  >
                    <HiOutlineMail className="mr-2" />
                    langer.biuro@poczta.fm
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Mapa */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
              onClick={() => {
                gaEvent('gbp_click', { location: 'kontakt_map' });
                window.open(googleMapsUrlWithUtm, '_blank');
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden">
                <MapComponent coordinates={coordinates} isHovered={false} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
