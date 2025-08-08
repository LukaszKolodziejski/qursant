/* Field RUM collection for Core Web Vitals (LCP/INP/CLS) to GA4 via gtag */
import { gaEvent, isGaEnabled } from './ga';

type WebVitalMetric = {
  name: 'CLS' | 'LCP' | 'INP' | 'FCP' | 'TTFB';
  value: number;
  id: string;
};

export function reportWebVitals(metric: WebVitalMetric): void {
  if (!isGaEnabled()) return;
  const pagePath =
    typeof window !== 'undefined' ? window.location.pathname : '';
  const nav =
    typeof navigator !== 'undefined'
      ? (navigator as Navigator & {
          connection?: { effectiveType?: string };
          deviceMemory?: number;
        })
      : undefined;
  const effectiveType = nav?.connection?.effectiveType;
  const deviceMemory = nav?.deviceMemory;

  gaEvent('web_vital', {
    event_category: 'Web Vitals',
    event_label: metric.name,
    value: Math.round(
      metric.name === 'CLS' ? metric.value * 1000 : metric.value
    ),
    metric_id: metric.id,
    page_path: pagePath,
    effective_type: effectiveType,
    device_memory: deviceMemory,
  });
}
