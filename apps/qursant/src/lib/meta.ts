import type { Metadata } from 'next';
import { INTENTS, type IntentKey } from '@/data/intents';

type BuildMetaInput = {
  intent: IntentKey;
  title: string;
  description: string;
  path?: string; // canonical path like "/cennik"
};

/**
 * Buduje spójne meta dla stron na podstawie intencji i szablonów.
 * Zwraca obiekt kompatybilny z Next Metadata API.
 */
export function buildMeta({
  intent,
  title,
  description,
  path,
}: BuildMetaInput): Metadata {
  const intentDef = INTENTS[intent];

  const safeDescription = description.replace(/\s+/g, ' ').trim().slice(0, 300); // zabezpieczenie przed zbyt długim opisem

  const canonical = path ? path : undefined;

  return {
    title,
    description: safeDescription,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title,
      description: safeDescription,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: safeDescription,
    },
    category: intentDef.label.toLowerCase(),
  } satisfies Metadata;
}

export type { BuildMetaInput };
