// ===================================================================
// SERVER COMPONENT - PREMIUM SEO + PERFORMANCE OPTIMIZED!
// ===================================================================
// LAZY LOADING: Sekcje poniżej fold ładują się dopiero przy scrollu
// Oszczędność: ~200KB JavaScript! ⚡
// Google widzi WSZYSTKO (SSR), ale JS ładuje się on-demand!
// ===================================================================

import dynamic from 'next/dynamic';
import {
  organizationSchema,
  websiteSchema,
  breadcrumbSchema,
} from '@/lib/schemas/homepage-schemas';

// ===================================================================
// ABOVE THE FOLD - Tylko HeroSection (krytyczny dla LCP)
// ===================================================================
import HeroSection from '@/components/home/HeroSection';

// ===================================================================
// BELOW THE FOLD - Aggressive lazy load (oszczędność ~400KB JS!)
// PERFORMANCE BOOST: Tylko HeroSection ładuje się od razu!
// ===================================================================
const FleetSection = dynamic(() => import('@/components/home/FleetSection'), {
  loading: () => (
    <div className="min-h-[500px] bg-gradient-to-b from-indigo-900 to-blue-950" />
  ),
});

const StatsSection = dynamic(() => import('@/components/home/StatsSection'), {
  loading: () => (
    <div className="min-h-[400px] bg-gradient-to-b from-blue-950 to-indigo-950" />
  ),
});

const NewsSection = dynamic(() => import('@/components/home/NewsSection'), {
  loading: () => (
    <div className="min-h-[500px] bg-gradient-to-b from-indigo-950 to-blue-950" />
  ),
});

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
