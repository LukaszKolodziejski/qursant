/*
 Lightweight GA4 helper for client-side usage with gtag.js
 - Exposes safe wrappers: init, event, pageview
 - Reads measurement id from NEXT_PUBLIC_GA4_ID
*/

export type GaEventParams = Record<
  string,
  string | number | boolean | undefined
>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID || '';

export function isGaEnabled(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.gtag === 'function' &&
    !!GA_MEASUREMENT_ID
  );
}

export function gaPageView(path: string): void {
  if (!isGaEnabled()) return;
  window.gtag('event', 'page_view', {
    page_path: path,
  });
}

export function gaEvent(action: string, params?: GaEventParams): void {
  if (!isGaEnabled()) return;
  window.gtag('event', action, params || {});
}

export function initConsentDefaults(): void {
  if (!GA_MEASUREMENT_ID) return;
  if (typeof window === 'undefined') return;
  // Set a conservative default Consent Mode; can be updated later by a CMP
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'default', {
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      ad_storage: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500,
    });
  }
}
