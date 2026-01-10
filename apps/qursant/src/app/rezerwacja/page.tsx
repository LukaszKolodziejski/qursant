'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
// import HCaptcha from '@hcaptcha/react-hcaptcha';
import { toast, Toaster } from 'react-hot-toast';
import {
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
} from 'react-icons/hi';
import Link from 'next/link';
import { useReservationCounter } from '@/hooks/useReservationCounter';

// Typy kierunkowe
type CountryCode = '+48' | '+380';

interface ValidationErrors {
  name?: string;
  phone?: string;
}

// Funkcja formatowania numeru telefonu
const formatPhoneNumber = (value: string, countryCode: CountryCode): string => {
  // Usuwamy wszystko oprócz cyfr
  const digits = value.replace(/\D/g, '');
  
  if (countryCode === '+48') {
    // Format polski: XXX XXX XXX
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
  } else {
    // Format ukraiński: XX XXX XXXX
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 9)}`;
  }
};

// Walidacja imienia i nazwiska (ukryta logika - bez podpowiedzi)
const validateName = (name: string): { isValid: boolean; isSpam?: boolean } => {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return { isValid: false };
  }
  
  const words = trimmedName.split(/\s+/).filter(word => word.length > 0);
  
  // Musi być 2-3 słowa
  if (words.length < 2 || words.length > 3) {
    return { isValid: false, isSpam: true };
  }
  
  // Każde słowo musi zawierać tylko litery (polskie/ukraińskie)
  const lettersOnlyRegex = /^[a-ząćęłńóśźżA-ZĄĆĘŁŃÓŚŹŻґєіїҐЄІЇа-яА-Я'-]+$/;
  
  for (const word of words) {
    if (!lettersOnlyRegex.test(word)) {
      return { isValid: false, isSpam: true };
    }
  }
  
  // Akceptujemy dwa warianty:
  // 1. Wszystkie małe litery (jan kowalski)
  // 2. Każde słowo zaczyna się wielką literą (Jan Kowalski)
  const allLowerCase = trimmedName === trimmedName.toLowerCase();
  const properCase = words.every(word => {
    // Pierwsza litera wielka, reszta mała
    const firstChar = word.charAt(0);
    const rest = word.slice(1);
    const isFirstUpper = firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase();
    const isRestLower = rest === rest.toLowerCase();
    return isFirstUpper && isRestLower;
  });
  
  if (!allLowerCase && !properCase) {
    return { isValid: false, isSpam: true };
  }
  
  return { isValid: true };
};

// Walidacja numeru telefonu
const validatePhone = (phone: string): { isValid: boolean; error?: string } => {
  const digits = phone.replace(/\D/g, '');
  
  if (digits.length === 0) {
    return { isValid: false, error: 'Numer telefonu jest wymagany' };
  }
  
  if (digits.length < 9) {
    return { isValid: false, error: `Brakuje ${9 - digits.length} cyfr` };
  }
  
  if (digits.length > 9) {
    return { isValid: false, error: 'Za dużo cyfr (max 9)' };
  }
  
  return { isValid: true };
};

export default function RezerwacjaPage() {
  const { remainingPlaces, progressWidth, currentDate } =
    useReservationCounter();
  const [monthOptions, setMonthOptions] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    month: '',
    agreement: false,
  });
  const [countryCode, setCountryCode] = useState<CountryCode>('+48');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  // const [captchaToken, setCaptchaToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handler dla telefonu z auto-formatowaniem
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const digits = input.replace(/\D/g, '');
    
    // Ograniczamy do 9 cyfr
    if (digits.length <= 9) {
      const formatted = formatPhoneNumber(digits, countryCode);
      setFormData({ ...formData, phone: formatted });
      
      // Walidacja w czasie rzeczywistym
      if (digits.length > 0 && digits.length < 9) {
        setValidationErrors(prev => ({ 
          ...prev, 
          phone: `Brakuje ${9 - digits.length} cyfr` 
        }));
      } else {
        setValidationErrors(prev => ({ ...prev, phone: undefined }));
      }
    }
  };
  
  // Handler dla imienia - bez walidacji w czasie rzeczywistym (ukryta logika)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };
  
  // Handler zmiany kierunkowego
  const handleCountryCodeChange = (newCode: CountryCode) => {
    setCountryCode(newCode);
    // Przeformatuj numer przy zmianie kierunkowego
    const digits = formData.phone.replace(/\D/g, '');
    const formatted = formatPhoneNumber(digits, newCode);
    setFormData({ ...formData, phone: formatted });
  };

  useEffect(() => {
    // Generowanie aktualnej daty i opcji miesięcy
    const now = new Date();
    const months = [
      'Styczeń',
      'Luty',
      'Marzec',
      'Kwiecień',
      'Maj',
      'Czerwiec',
      'Lipiec',
      'Sierpień',
      'Wrzesień',
      'Październik',
      'Listopad',
      'Grudzień',
    ];

    // Generowanie opcji dla następnych 6 miesięcy
    const options: string[] = [];
    for (let i = 0; i < 7; i++) {
      const futureDate = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const monthName = months[futureDate.getMonth()];
      const year = futureDate.getFullYear();
      options.push(`${monthName} ${year}`);
    }
    setMonthOptions(options);
    setFormData((prev) => ({ ...prev, month: options[0] }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Walidacja imienia - bez podpowiedzi co jest źle
    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      if (nameValidation.isSpam) {
        // Straszny komunikat dla spamerów
        toast.error('⚠️ Wykryto podejrzaną aktywność', {
          duration: 6000,
        });
        setTimeout(() => {
          toast('Twoja aktywność jest monitorowana. Adres IP został zapisany w celach bezpieczeństwa.', {
            icon: '🔒',
            duration: 8000,
            style: {
              background: '#1e1b4b',
              color: '#fca5a5',
              border: '1px solid #dc2626',
            },
          });
        }, 1000);
      } else {
        toast.error('Wprowadź imię i nazwisko');
      }
      return;
    }

    // Walidacja telefonu
    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      toast.error(phoneValidation.error || 'Nieprawidłowy numer telefonu');
      setValidationErrors(prev => ({ ...prev, phone: phoneValidation.error }));
      return;
    }

    if (!formData.agreement) {
      toast.error('Proszę zaakceptować politykę prywatności');
      return;
    }

    setIsSubmitting(true);

    // Przygotuj pełny numer z kierunkowym
    const fullPhoneNumber = `${countryCode} ${formData.phone}`;

    try {
      const response = await fetch('/api/send-reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: fullPhoneNumber,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Rezerwacja została wysłana pomyślnie!', {
          duration: 5000,
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          month: monthOptions[0],
          agreement: false,
        });
      } else {
        // Pokazujemy główny komunikat o błędzie
        toast.error(
          data.error || 'Wystąpił błąd podczas wysyłania rezerwacji',
          {
            duration: 5000,
          }
        );

        // Jeśli są szczegóły błędu, pokazujemy je w osobnym toast
        if (data.details) {
          setTimeout(() => {
            toast(data.details, {
              icon: '❗',
              duration: 7000,
            });
          }, 1000);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(
        'Nie udało się połączyć z serwerem. Spróbuj ponownie później.',
        {
          duration: 5000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animacje

  const pulseAnimation = {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  };

  return (
    <div className="min-h-screen">
      <Toaster 
        position="bottom-center" 
        toastOptions={{
          style: {
            maxWidth: '90vw',
            margin: '0 auto 20px auto',
          },
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
            <motion.div
              animate={pulseAnimation}
              className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 text-orange-300 text-sm font-medium mb-6"
            >
              Zarezerwuj swoje miejsce już teraz!
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                Rezerwacja kursu
              </span>
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Wypełnij formularz poniżej, aby zarezerwować miejsce na kursie
            </p>

            {/* Progress section */}
            <div className="max-w-2xl mx-auto mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
              <p className="text-base sm:text-lg font-medium text-blue-200 mb-3">
                {remainingPlaces < 5
                  ? `Ostatnie ${remainingPlaces} wolne miejsca w ${currentDate}`
                  : `Ostatnich ${remainingPlaces} wolnych miejsc w ${currentDate}`}
              </p>

              <div className="relative h-[30px] bg-white/10 rounded-[20px] overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-[20px] flex items-center justify-center text-white font-medium"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progressWidth}%` }}
                  transition={{ duration: 1 }}
                >
                  {Math.round(progressWidth / 4.5)}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Formularz */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-blue-500/20"
            >
              <div className="space-y-4 sm:space-y-6">
                {/* Imię i nazwisko */}
                <div>
                  <label className="flex items-center text-white mb-2">
                    <HiOutlineUser className="mr-2" />
                    Imię i nazwisko
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleNameChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                    placeholder="Wpisz swoje imię i nazwisko"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center text-white mb-2">
                    <HiOutlineMail className="mr-2" />
                    Adres email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
                    placeholder="Wprowadź adres email"
                  />
                </div>

                {/* Telefon */}
                <div>
                  <label className="flex items-center text-white mb-2">
                    <HiOutlinePhone className="mr-2" />
                    Telefon
                  </label>
                  <div className="flex gap-2">
                    {/* Wybór kierunkowego */}
                    <select
                      value={countryCode}
                      onChange={(e) => handleCountryCodeChange(e.target.value as CountryCode)}
                      className="px-2 sm:px-3 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 text-sm sm:text-base shrink-0"
                    >
                      <option value="+48" className="bg-gray-900">🇵🇱 +48</option>
                      <option value="+380" className="bg-gray-900">🇺🇦 +380</option>
                    </select>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className={`flex-1 min-w-0 px-3 sm:px-4 py-3 rounded-lg bg-white/10 border text-white placeholder-white/50 focus:outline-none transition-colors ${
                        validationErrors.phone 
                          ? 'border-red-500 focus:border-red-400' 
                          : 'border-white/20 focus:border-blue-500'
                      }`}
                      placeholder={countryCode === '+48' ? '123 456 789' : '12 345 6789'}
                      maxLength={11}
                    />
                  </div>
                  {validationErrors.phone && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.phone}</p>
                  )}
                </div>

                {/* Wybór miesiąca */}
                <div>
                  <label className="flex items-center text-white mb-2">
                    <HiOutlineCalendar className="mr-2" />
                    Termin rozpoczęcia kursu
                  </label>
                  <select
                    value={formData.month}
                    onChange={(e) =>
                      setFormData({ ...formData, month: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500"
                  >
                    {monthOptions.map((month) => (
                      <option key={month} value={month} className="bg-gray-900">
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Zgoda na przetwarzanie danych */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={formData.agreement}
                    onChange={(e) =>
                      setFormData({ ...formData, agreement: e.target.checked })
                    }
                    className="mt-1"
                  />
                  <label htmlFor="agreement" className="text-blue-200">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych
                    zgodnie z{' '}
                    <Link
                      href="/polityka-prywatnosci"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Polityką Prywatności
                    </Link>
                  </label>
                </div>

                {/* Przycisk submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Wysyłanie...' : 'Zarezerwuj miejsce'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
