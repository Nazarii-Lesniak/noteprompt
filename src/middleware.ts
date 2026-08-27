import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const pathnameSegments = pathname.split('/').filter(Boolean);
  const hasLocale = routing.locales.includes(
    pathnameSegments.at(0) as 'uk' | 'en',
  );
  const locale = hasLocale ? pathnameSegments.at(0) : routing.defaultLocale;
  const pathnameWithoutLocale = hasLocale
    ? '/' + pathnameSegments.slice(1).join('/')
    : pathname;

  const isPrivateRoute =
    pathnameWithoutLocale === '/' ||
    pathnameWithoutLocale.startsWith('/prompts') ||
    pathnameWithoutLocale.startsWith('/settings');

  const isAuthRoute =
    pathnameWithoutLocale === '/sign-in' ||
    pathnameWithoutLocale === '/sign-up' ||
    pathnameWithoutLocale === '/forgot-password';

  if (!user && isPrivateRoute) {
    const redirectUrl = new URL(`/${locale}/sign-in`, request.url);
    const redirectResponse = NextResponse.redirect(redirectUrl);
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  }

  if (user && isAuthRoute) {
    const redirectUrl = new URL(`/${locale}`, request.url);
    const redirectResponse = NextResponse.redirect(redirectUrl);
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|auth|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
