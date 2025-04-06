import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './src/i18n/settings';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Przekierowanie z głównej strony na domyślny język (polski)
  if (pathname === '/') {
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  // Obsługa i18n dla pozostałych ścieżek
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  return createMiddleware({
    defaultLocale,
    locales,
    localePrefix: 'never',
  })(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
