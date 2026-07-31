type ReservationSheetRow = {
  name: string;
  email: string;
};

/**
 * Dopisuje rezerwację do Google Sheets przez webhook Google Apps Script.
 * Błędy są logowane, ale nie przerywają procesu rezerwacji.
 */
export async function appendReservationToSheet({
  name,
  email,
}: ReservationSheetRow): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      'GOOGLE_SHEETS_WEBHOOK_URL nie jest ustawiony — pomijam zapis do arkusza'
    );
    return;
  }

  const date = new Date().toLocaleString('pl-PL', {
    timeZone: 'Europe/Warsaw',
  });

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, name, email }),
      // Apps Script web app czasem wolno odpowiada przy cold start
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      console.error(
        'Nie udało się zapisać rezerwacji do Google Sheets:',
        response.status,
        body
      );
      return;
    }

    console.log('Rezerwacja zapisana do Google Sheets:', { date, name, email });
  } catch (error) {
    console.error('Błąd zapisu do Google Sheets:', error);
  }
}
