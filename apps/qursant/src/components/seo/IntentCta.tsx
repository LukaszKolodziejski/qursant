import Link from 'next/link';
import React from 'react';
import { INTENTS, IntentKey } from '@/data/intents';

type IntentCtaProps = {
  intent: IntentKey;
  href?: string;
  label?: string;
  className?: string;
};

export default function IntentCta({
  intent,
  href,
  label,
  className,
}: IntentCtaProps) {
  const def = INTENTS[intent].defaultCta;
  const finalHref = href ?? def.href;
  const finalLabel = label ?? def.label;

  return (
    <Link
      href={finalHref}
      className={
        className ??
        'inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-105'
      }
    >
      {finalLabel}
    </Link>
  );
}
