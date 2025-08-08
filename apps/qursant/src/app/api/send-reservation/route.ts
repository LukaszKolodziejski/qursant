import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  getReservationEmailTemplate,
  getAdminEmailTemplate,
} from '@/constants/emailTemplates';
import { CONTACT } from '@/constants/contact';
import { sendGaEventServer } from '@/lib/ga-server';

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

    console.log('Dane rezerwacji:', { name, email, phone, month });

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
    // Fire server-side GA4 event (optional)
    void sendGaEventServer('lead_submit_success', {
      page_path: '/rezerwacja',
      phone,
      email_domain: typeof email === 'string' ? email.split('@')[1] : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Rezerwacja została przyjęta pomyślnie',
        // hint for client to optionally treat as conversion
        event: 'lead_submit_success',
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
