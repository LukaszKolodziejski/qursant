// ===================================================================
// SERVER COMPONENT - PREMIUM SEO + PERFORMANCE OPTIMIZED!
// ===================================================================
// LAZY LOADING: Sekcje poniżej fold ładują się dopiero przy scrollu
// Oszczędność: ~200KB JavaScript! ⚡
// Google widzi WSZYSTKO (SSR), ale JS ładuje się on-demand!
// ===================================================================

import dynamic from 'next/dynamic';
import { CONTACT } from '@/constants/contact';

// ===================================================================
// ABOVE THE FOLD - Ładuj natychmiast (krytyczne dla LCP)
// ===================================================================
import HeroSection from '@/components/home/HeroSection';
import FleetSection from '@/components/home/FleetSection';
import StatsSection from '@/components/home/StatsSection';
import NewsSection from '@/components/home/NewsSection';

// ===================================================================
// BELOW THE FOLD - Lazy load (oszczędność ~200KB JS!)
// ===================================================================
const ProcessSection = dynamic(
  () => import('@/components/home/ProcessSection'),
  {
    loading: () => (
      <div className="min-h-[400px] bg-gradient-to-b from-blue-950 to-indigo-950" />
    ),
  }
);

const CourseOverviewSection = dynamic(
  () => import('@/components/home/CourseOverviewSection'),
  {
    loading: () => (
      <div className="min-h-[400px] bg-gradient-to-b from-indigo-950 to-blue-950" />
    ),
  }
);

const TestimonialsSection = dynamic(
  () => import('@/components/home/TestimonialsSection'),
  {
    loading: () => (
      <div className="min-h-[400px] bg-gradient-to-b from-blue-950 to-purple-950" />
    ),
  }
);

const LocalSEOSection = dynamic(
  () => import('@/components/home/LocalSEOSection'),
  {
    loading: () => (
      <div className="min-h-[400px] bg-gradient-to-b from-indigo-950 to-blue-950" />
    ),
  }
);

const FAQSection = dynamic(() => import('@/components/home/FAQSection'), {
  loading: () => (
    <div className="min-h-[400px] bg-gradient-to-b from-blue-950 to-indigo-950" />
  ),
});

const ContactCTASection = dynamic(
  () => import('@/components/home/ContactCTASection'),
  {
    loading: () => (
      <div className="min-h-[200px] bg-gradient-to-b from-blue-950 to-gray-900" />
    ),
  }
);

export default function HomePage() {
  // ===================================================================
  // PREMIUM SCHEMA.ORG - MAXIMUM SEO POWER! 🚀
  // ===================================================================
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    '@id': 'https://www.qursant.com.pl/#organization',
    name: 'Szkoła Jazdy Qursant',
    alternateName: 'Qursant Bydgoszcz',
    url: 'https://www.qursant.com.pl',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.qursant.com.pl/logo/logo-white.png',
      width: '300',
      height: '100',
    },
    image: [
      'https://www.qursant.com.pl/images/cars/photo-77.webp',
      'https://www.qursant.com.pl/images/cars/photo-78.webp',
      'https://www.qursant.com.pl/images/instructors/photo-1.webp',
    ],
    description:
      'Profesjonalna szkoła jazdy w Bydgoszczy. Od 2009 roku kształcimy najlepszych kierowców. Najwyższa zdawalność, doświadczeni instruktorzy, nowoczesna flota.',
    telephone: CONTACT.PHONE_RAW,
    email: CONTACT.EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Ujejskiego 46a',
      addressLocality: 'Bydgoszcz',
      addressRegion: 'Kujawsko-Pomorskie',
      postalCode: '85-168',
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 53.1114435,
      longitude: 18.016832,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '156',
      reviewCount: '140',
    },
    priceRange: '2800-3800 PLN',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/Qursant/',
      'https://www.instagram.com/qursantlangerrobert/',
      'https://www.google.pl/maps/place/Szkoła+Jazdy+Qursant/@53.1133239,18.0069507,15z',
    ],
    areaServed: [
      {
        '@type': 'City',
        name: 'Bydgoszcz',
      },
      {
        '@type': 'City',
        name: 'Fordon',
      },
      {
        '@type': 'City',
        name: 'Osielsko',
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.qursant.com.pl/#website',
    url: 'https://www.qursant.com.pl',
    name: 'Szkoła Jazdy Qursant Bydgoszcz',
    description:
      'Profesjonalna szkoła jazdy w Bydgoszczy - kursy na prawo jazdy kategorii B',
    publisher: {
      '@id': 'https://www.qursant.com.pl/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.qursant.com.pl/blog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'pl-PL',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Strona Główna',
        item: 'https://www.qursant.com.pl',
      },
    ],
  };

  return (
    <>
      {/* PREMIUM SCHEMA.ORG FOR GOOGLE - MAXIMUM VISIBILITY! */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* ALL SECTIONS - SSR RENDERED - GOOGLE SEES EVERYTHING! */}
      <HeroSection />
      <FleetSection />
      <StatsSection />
      <ProcessSection />
      <CourseOverviewSection />
      <TestimonialsSection />
      <LocalSEOSection />
      <NewsSection />
      <FAQSection />
      <ContactCTASection />
    </>
  );
}
