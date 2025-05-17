import { NextResponse } from 'next/server';
import { Resend, CreateEmailResponse } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, month } = await request.json();

    if (!process.env.RESEND_API_KEY) {
      throw new Error('Brak klucza API Resend');
    }

    console.log('Próba wysłania emaila z danymi:', {
      name,
      email,
      phone,
      month,
    });

    const data = await resend.emails.send({
      from: 'Qursant <onboarding@resend.dev>', // Na początku musimy użyć tego adresu
      to: ['lukasz.kolodziejski333@gmail.com'],
      replyTo: email, // Dodajemy reply_to, aby móc odpowiedzieć kursantowi
      subject: 'Nowa rezerwacja kursu',
      html: `
        <h2>Nowa rezerwacja kursu</h2>
        <p><strong>Imię i nazwisko:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Termin:</strong> ${month}</p>
        <p><strong>Data rezerwacji:</strong> ${new Date().toLocaleString(
          'pl-PL'
        )}</p>
      `,
    });

    console.log('Odpowiedź z Resend:', data);

    return NextResponse.json({
      message: 'Rezerwacja wysłana pomyślnie',
      id: data.data?.id,
    });
  } catch (error: any) {
    console.error('Szczegóły błędu:', {
      message: error.message,
      stack: error.stack,
      details: error.response?.data || error,
    });

    return NextResponse.json(
      {
        error: 'Wystąpił błąd podczas wysyłania rezerwacji',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
