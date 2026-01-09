import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  getReservationEmailTemplate,
  getAdminEmailTemplate,
} from '@/constants/emailTemplates';
import { CONTACT } from '@/constants/contact';

// Walidacja imienia i nazwiska (ukryta logika - bez podpowiedzi dla spamerów)
const validateName = (name: string): { isValid: boolean; isSpam?: boolean } => {
  if (!name || typeof name !== 'string') {
    return { isValid: false };
  }

  const trimmedName = name.trim();
  const words = trimmedName.split(/\s+/).filter((word) => word.length > 0);

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
  const properCase = words.every((word) => {
    const firstChar = word.charAt(0);
    const rest = word.slice(1);
    const isFirstUpper =
      firstChar === firstChar.toUpperCase() &&
      firstChar !== firstChar.toLowerCase();
    const isRestLower = rest === rest.toLowerCase();
    return isFirstUpper && isRestLower;
  });

  if (!allLowerCase && !properCase) {
    return { isValid: false, isSpam: true };
  }

  return { isValid: true };
};

// Walidacja numeru telefonu: kierunkowy + 9 cyfr
const validatePhone = (phone: string): { isValid: boolean; error?: string } => {
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, error: 'Numer telefonu jest wymagany' };
  }

  // Akceptujemy format: +48 XXX XXX XXX lub +380 XX XXX XXXX
  const phoneRegex = /^\+?(48|380)\s?\d{2,3}\s?\d{3}\s?\d{3,4}$/;

  if (!phoneRegex.test(phone)) {
    // Sprawdź czy są same cyfry (bez kierunkowego)
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 9 && digits.length !== 11 && digits.length !== 12) {
      return { isValid: false, error: 'Nieprawidłowy numer telefonu' };
    }
  }

  return { isValid: true };
};

// Walidacja email
const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Email jest wymagany' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Nieprawidłowy format email' };
  }

  return { isValid: true };
};

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: 'Błąd konfiguracji serwera',
          details: 'Brak klucza API do serwisu email',
        },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, phone, month } = await request.json();

    // Walidacja po stronie serwera - straszny komunikat dla spamerów
    const nameValidation = validateName(name);
    if (!nameValidation.isValid) {
      console.log(
        '⚠️ SPAM WYKRYTY - nieprawidłowe imię:',
        name,
        'IP:',
        request.headers.get('x-forwarded-for') || 'unknown'
      );
      return NextResponse.json(
        {
          success: false,
          error: '⚠️ Wykryto podejrzaną aktywność',
          details:
            'Twoja aktywność jest monitorowana. Adres IP został zapisany w celach bezpieczeństwa.',
        },
        { status: 400 }
      );
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      console.log(
        '⚠️ SPAM WYKRYTY - nieprawidłowy email:',
        email,
        'IP:',
        request.headers.get('x-forwarded-for') || 'unknown'
      );
      return NextResponse.json(
        {
          success: false,
          error: '⚠️ Wykryto podejrzaną aktywność',
          details:
            'Twoja aktywność jest monitorowana. Adres IP został zapisany w celach bezpieczeństwa.',
        },
        { status: 400 }
      );
    }

    const phoneValidation = validatePhone(phone);
    if (!phoneValidation.isValid) {
      console.log(
        '⚠️ SPAM WYKRYTY - nieprawidłowy telefon:',
        phone,
        'IP:',
        request.headers.get('x-forwarded-for') || 'unknown'
      );
      return NextResponse.json(
        {
          success: false,
          error: '⚠️ Wykryto podejrzaną aktywność',
          details:
            'Twoja aktywność jest monitorowana. Adres IP został zapisany w celach bezpieczeństwa.',
        },
        { status: 400 }
      );
    }

    console.log('Dane rezerwacji (zwalidowane):', {
      name,
      email,
      phone,
      month,
    });

    // Generowanie szablonów email
    const customerEmailHtml = getReservationEmailTemplate({ name, month });
    const adminEmailHtml = getAdminEmailTemplate({ name, email, phone, month });

    console.log('Wysyłanie emaila do klienta...');
    const customerResponse = await resend.emails.send({
      from: 'Qursant <no-reply@qursant.com.pl>',
      to: [email],
      subject: 'Potwierdzenie rezerwacji kursu - Szkoła Jazdy Qursant',
      html: customerEmailHtml,
    });
    console.log('Odpowiedź z wysyłki emaila do klienta:', customerResponse);

    console.log('Wysyłanie emaila do admina...');
    const adminResponse = await resend.emails.send({
      from: 'Qursant <no-reply@qursant.com.pl>',
      to: [CONTACT.EMAIL],
      // to: ['lukkoli.web@wp.pl'],
      replyTo: email,
      subject: 'Nowa rezerwacja kursu',
      html: adminEmailHtml,
    });
    console.log('Odpowiedź z wysyłki emaila do admina:', adminResponse);

    // Sprawdzanie statusu obu emaili
    if (customerResponse.error) {
      // Jeśli błąd dotyczy walidacji domeny (403)
      if (
        'statusCode' in customerResponse.error &&
        customerResponse.error.statusCode === 403
      ) {
        return NextResponse.json(
          {
            success: false,
            error: 'Błąd konfiguracji serwera email',
            details:
              'Proszę spróbować później lub skontaktować się z nami telefonicznie',
          },
          { status: 403 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Nie udało się wysłać potwierdzenia na Twój adres email',
          details:
            'Proszę sprawdzić poprawność adresu email lub spróbować później',
        },
        { status: 500 }
      );
    }

    if (adminResponse.error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Wystąpił błąd podczas przetwarzania rezerwacji',
          details:
            'Proszę spróbować później lub skontaktować się z nami telefonicznie',
        },
        { status: 500 }
      );
    }

    // Jeśli wszystko się udało
    return NextResponse.json(
      {
        success: true,
        message: 'Rezerwacja została przyjęta pomyślnie',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Błąd podczas przetwarzania rezerwacji:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Wystąpił nieoczekiwany błąd',
        details:
          'Proszę spróbować później lub skontaktować się z nami telefonicznie',
      },
      { status: 500 }
    );
  }
}
