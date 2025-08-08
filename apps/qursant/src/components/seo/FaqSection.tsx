'use client';
import StructuredData from './StructuredData';

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  items: FaqItem[];
  heading?: string;
  className?: string;
};

export default function FaqSection({
  items,
  heading = 'Najczęstsze pytania',
  className,
}: FaqSectionProps) {
  if (!items || items.length === 0) return null;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } as const;

  return (
    <section className={className} aria-labelledby="faq-heading">
      <StructuredData id="faq-jsonld" data={faqJsonLd} />
      <div className="container mx-auto px-6">
        <h2 id="faq-heading" className="text-3xl font-bold text-white mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-300">
            {heading}
          </span>
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {items.map((faq, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h3 className="text-xl font-medium text-white">{faq.question}</h3>
              <p className="text-blue-100 mt-3">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
