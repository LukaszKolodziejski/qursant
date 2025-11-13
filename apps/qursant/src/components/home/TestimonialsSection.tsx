'use client';

// ⚡⚡⚡ ULTRA PERFORMANCE OPTIMIZED ⚡⚡⚡
// - ZERO Framer Motion
// - Pure CSS animations
// - Oszczędność: ~100KB JavaScript!

import Link from 'next/link';
import { FaQuoteRight } from 'react-icons/fa';

export default function TestimonialsSection() {
  type Testimonial = {
    name: string;
    role: string;
    quote: string;
    stars: number;
    link?: string;
  };
  return (
    <section className="bg-gradient-to-b from-indigo-950 to-blue-950 py-12 sm:py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1),transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* CSS Animation: fade-in-up-20 */}
        <div className="text-center mb-16 animate-fade-in-up-20">
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-200">
              Co mówią nasi kursanci
            </span>
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Opinie osób, które zdobyły prawo jazdy dzięki naszej szkole
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(
            [
              {
                name: 'Anna',
                role: 'Kategoria B',
                quote:
                  'Nie sądziłam, że uda mi się kiedykolwiek zdać prawo jazdy a stało się tak jeszcze za pierwszym razem, Pan Robert bardzo cierpliwy, miły, instruktor na wielki medal. Serdecznie zachęcam i polecam Szkołę jazdy Qursant.',
                stars: 5,
              },
              {
                name: 'Piotr',
                role: 'Kategoria B',
                quote:
                  'Nie mając do tej pory dotyczenia z kierownicą, a dzięki Panu Rafałowi wystarczyło 30 godzin i egzamin zdany za 1 podejściem. Serdecznie polecam Szkołę jazdy Qursant.',
                stars: 5,
              },
              {
                name: 'Karolina',
                role: 'Kategoria B',
                quote:
                  'Świetna szkoła jazdy! Egzamin zdany za pierwszym razem, a instruktor Rafał to prawdziwy profesjonalista świetnie przygotowuje do egzaminu i doskonale zna przepisy. Polecam!',
                stars: 5,
              },
              {
                name: 'Więcej opinii',
                role: '',
                quote:
                  'Sprawdź wszystkie opinie naszych kursantów na portalu SuperPrawoJazdy',
                link: 'https://www.superprawojazdy.pl/szkola-jazdy-qursant,5277.htm',
                stars: 5,
              },
            ] as Testimonial[]
          ).map((testimonial, index) => (
            <Link
              key={index}
              href="https://www.superprawojazdy.pl/szkola-jazdy-qursant,5277.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {/* CSS Animation: staggered fade-in-up with inline delay */}
              <div
                className="relative p-6 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 hover:border-white/20 transition-all duration-300 cursor-pointer h-full animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -top-6 left-6">
                  <div className="h-12 w-12 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 blur-md opacity-80"></div>
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-full bg-blue-900 border border-blue-400 text-white">
                      <FaQuoteRight />
                    </div>
                  </div>
                </div>

                <div className="pt-8 pb-4">
                  <p className="text-blue-100 mb-6 hover:text-blue-300 transition-colors">
                    {testimonial.quote}
                  </p>
                </div>

                <div className="flex items-center">
                  <div>
                    <p className="text-white font-medium">{testimonial.name}</p>
                    <p className="text-blue-300 text-sm">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.stars
                            ? 'text-yellow-400'
                            : 'text-gray-400'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
