// Server-side GA4 Measurement Protocol lightweight sender
// Requires: process.env.NEXT_PUBLIC_GA4_ID and process.env.GA4_API_SECRET

import { randomUUID } from 'node:crypto';

type GaServerEventParams = Record<
  string,
  string | number | boolean | undefined
>;

export async function sendGaEventServer(
  name: string,
  params?: GaServerEventParams
): Promise<void> {
  try {
    const measurementId = process.env.NEXT_PUBLIC_GA4_ID;
    const apiSecret = process.env.GA4_API_SECRET;
    if (!measurementId || !apiSecret) return;

    const endpoint = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;

    const body = {
      client_id: randomUUID(),
      non_personalized_ads: true,
      events: [
        {
          name,
          params: params || {},
        },
      ],
    };

    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    // Silent fail to avoid impacting API
    console.warn('GA4 server event send failed:', err);
  }
}
