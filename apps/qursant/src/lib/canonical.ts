/**
 * Utilities for building canonical URLs used in Next.js generateMetadata.
 * Keep this file free of Node-only APIs, it must be tree-shakable and safe for the edge/runtime.
 */

import { normalizePath } from './slug';

/**
 * Returns the absolute canonical URL given a path. Uses the public site base.
 * Ensure paths are normalized and without query/hash.
 */
export function buildCanonicalUrl(pathname: string): string {
  const base = 'https://www.qursant.com.pl';
  const normalized = normalizePath(pathname || '/');
  return `${base}${normalized}`;
}

/**
 * Returns a relative canonical path for Next.js alternates.canonical
 * Prefer relative canonicals in App Router for portability; Next will resolve via metadataBase.
 */
export function buildCanonicalPath(pathname: string): string {
  return normalizePath(pathname || '/');
}
