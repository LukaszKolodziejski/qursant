/**
 * Utilities for creating SEO-friendly slugs and normalizing URL paths.
 * These functions avoid any Node-specific APIs to be middleware-safe.
 */

/**
 * Convert arbitrary text to a kebab-case slug suitable for URLs.
 * - Lowercases
 * - Removes Polish diacritics and accents
 * - Replaces non-alphanumerics with hyphens
 * - Collapses multiple hyphens and trims them from edges
 */
export function toSlug(text: string): string {
  if (!text) return '';

  const lowered = text.toLowerCase();

  // Remove diacritics (PL and general accents)
  const withoutDiacritics = lowered
    .normalize('NFD')
    .replace(/\p{Diacritic}+/gu, '');

  // Replace anything not a-z0-9 with hyphen
  const replaced = withoutDiacritics.replace(/[^a-z0-9]+/g, '-');

  // Collapse multiple hyphens and trim from both ends
  const collapsed = replaced.replace(/-+/g, '-').replace(/^-|-$/g, '');

  return collapsed;
}

/**
 * Normalize a URL pathname to a canonical form (no protocol/host):
 * - Ensures it starts with '/'
 * - Lowercases and removes diacritics in each segment
 * - Collapses repeated slashes
 * - Removes `.html` suffix if present
 * - Removes trailing slash except for root '/'
 * - Strips query string and hash
 */
export function normalizePath(inputPath: string): string {
  if (!inputPath) return '/';

  // Remove protocol/host if accidentally included
  const pathOnly = inputPath.replace(/^[a-z]+:\/\/[\w.-]+/i, '');

  // Strip query and hash
  const [rawPath] = pathOnly.split(/[?#]/, 1);

  // Replace backslashes and collapse multiple slashes
  let path = rawPath.replace(/\\+/g, '/').replace(/\/\/+/g, '/');

  if (!path.startsWith('/')) path = `/${path}`;

  // Remove .html extension if present
  path = path.replace(/\.html$/i, '');

  // Normalize each segment (lowercase + remove diacritics)
  const segments = path
    .split('/')
    .filter((seg, idx) => !(seg === '' && idx > 0)) // prevent empty segments inside
    .map((seg) =>
      seg
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}+/gu, '')
    );

  let normalized = `/${segments.filter(Boolean).join('/')}`;

  // Remove trailing slash except root
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }

  return normalized || '/';
}
