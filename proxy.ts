import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { isDisabledPublicPath } from './lib/content/disabled-public-paths';

const intlMiddleware = createIntlMiddleware(routing);

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const indexNowKey = process.env.INDEXNOW_KEY?.trim();

  if (isDisabledPublicPath(request.nextUrl.pathname)) {
    const firstSegment = request.nextUrl.pathname.split('/')[1];
    const locale = ['en', 'es', 'ja'].includes(firstSegment)
      ? firstSegment
      : routing.defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/legacy-disabled`;
    return NextResponse.rewrite(url);
  }

  if (indexNowKey && request.nextUrl.pathname === `/${indexNowKey}.txt`) {
    const url = request.nextUrl.clone();
    url.pathname = "/indexnow-key.txt";
    return NextResponse.rewrite(url);
  }

  const intlResponse = intlMiddleware(request);

  return intlResponse;
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(en)/:path*',

    // Expose the IndexNow key at the root-level path required by crawlers
    '/:path*.txt',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!api|_next|_vercel|auth|privacy-policy|terms-of-service|refund-policy|.*\\.|favicon.ico).*)'
  ]
};
