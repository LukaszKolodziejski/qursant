'use client';

import Script from 'next/script';
import HeroSection from '@/components/home/HeroSection';
import FleetSection from '@/components/home/FleetSection';
import StatsSection from '@/components/home/StatsSection';
import ProcessSection from '@/components/home/ProcessSection';
import CourseOverviewSection from '@/components/home/CourseOverviewSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import ContactCTASection from '@/components/home/ContactCTASection';

export default function HomePage() {
  return (
    <>
      <Script id="schema-org" type="application/ld+json" />
      <HeroSection />
      <FleetSection />
      <StatsSection />
      <ProcessSection />
      <CourseOverviewSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactCTASection />
    </>
  );
}
