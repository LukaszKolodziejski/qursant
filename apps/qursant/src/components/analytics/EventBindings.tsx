'use client';

import { useEffect } from 'react';
import { gaEvent, gaPageView } from '@/lib/ga';
import { usePathname } from 'next/navigation';

export default function EventBindings() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      if (href.startsWith('tel:')) {
        const phone = href.replace('tel:', '');
        gaEvent('call_click', { phone });
      } else if (href.startsWith('mailto:')) {
        const email = href.replace('mailto:', '');
        gaEvent('email_click', { email });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (!pathname) return;
    gaPageView(pathname);
  }, [pathname]);

  return null;
}
