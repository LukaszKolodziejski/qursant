import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { normalizePath } from './lib/slug';

// Middleware to enforce canonical path normalization via 308 redirects.
export function middleware(request: NextRequest) {
  const url = new URL(request.url);

  // Skip static assets and Next internals
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/favicon') ||
    url.pathname.startsWith('/manifest') ||
    url.pathname.startsWith('/images') ||
    url.pathname.startsWith('/videos') ||
    url.pathname.startsWith('/logo') ||
    url.pathname.startsWith('/.well-known') ||
    url.pathname.startsWith('/robots.txt') ||
    url.pathname.startsWith('/sitemap')
  ) {
    return NextResponse.next();
  }

  const normalizedPath = normalizePath(url.pathname);

  // Only redirect if paths are different AND avoid conflicts with Next.js redirects
  if (
    normalizedPath !== url.pathname &&
    !url.pathname.endsWith('/') && // Let Next.js handle trailing slashes
    !url.pathname.endsWith('.html')
  ) {
    // Let Next.js handle .html removal
    const redirectUrl = new URL(request.url);
    redirectUrl.pathname = normalizedPath;
    redirectUrl.search = '';
    redirectUrl.hash = '';
    return NextResponse.redirect(redirectUrl, 308);
  }

  return NextResponse.next();
}

// Match all routes except static assets and Next.js internals
export const config = {
  matcher: [
    '/((?!_next|api|favicon|manifest|images|videos|logo|\\.well-known|robots\\.txt|sitemap).*)',
  ],
};
