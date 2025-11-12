/**
 * Lightweight Scroll Animation Hook
 * Zastępuje motion.div whileInView z Framer Motion
 * Oszczędność: ~40KB JavaScript!
 */

'use client';

import { useEffect, useRef } from 'react';

export function useScrollAnimation<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px', // Trigger 100px before element is visible
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
}
