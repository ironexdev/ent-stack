import { NextRequest, NextResponse } from "next/server"
import { indexedRoutes, protectedPages } from "@frontend/lib/routes"
import { i18n } from "@frontend/lib/i18n"
import { CookieEnum } from "@shared/enums/cookie-enum"
import AuthService from "@frontend/services/auth-service"
import { type LocaleType } from "@shared/i18n/t"
import { toastQueryParams } from "@frontend/lib/utils"
import { t_loginRequired } from "@shared/i18n/messages/t-auth"
import { ToastEnum } from "@frontend/enums/toast-enum"
import { type SessionType } from "@shared/types/session-type"
import {
  getLocalizedLoginPathname,
  getLocalizedMyProfilePathname,
  getLocalizedRegistrationPathname,
} from "@frontend/lib/navigation"

const protectedPathnameRegex = RegExp(
  `^(/(${i18n.locales.join("|")}))?(${protectedPages
    .flatMap((p) => (p === "/" ? ["", "/"] : p))
    .join("|")})/?$`,
  "i",
)

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Detect locale
  const locale = detectLocale(pathname)

  // 2. Rewrite URLs without prefix if there's no locale
  if (!locale) {
    const url = request.nextUrl.clone()
    url.pathname = `/${i18n.defaultLocale}${pathname}`
    return NextResponse.rewrite(url)
  }

  // 3. Redirect URLs with default locale to non-prefixed URLs
  if (locale === i18n.defaultLocale) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(`/${locale}`, "")
    return NextResponse.redirect(url)
  }

  // 4. Map to base route; handle 404 if not recognized
  const cleanedPathname = pathname.replace(/\/$/, "") // remove trailing slash
  const routeName = indexedRoutes[cleanedPathname]

  if (!routeName) {
    const notFoundUrl = request.nextUrl.clone()
    notFoundUrl.pathname = "/404"
    return NextResponse.rewrite(notFoundUrl)
  }

  // 5. Rewrite to actual Next.js route if it's not "/" so Next.js can render the page from e.g. `/registration` or `/login`
  if (routeName !== "/") {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = `/${i18n.defaultLocale}${routeName}`
    return NextResponse.rewrite(rewriteUrl)
  }

  // 6. Initialize response
  const response = NextResponse.next()

  // 7. Determine if route is protected
  const isProtectedPage = protectedPathnameRegex.test(pathname)

  // 8. Attempt to authenticate
  const session = await authenticateUser(request, locale, response)

  // 9. Route-level logic
  if (!isProtectedPage) {
    return handlePublicRoute(request, response, session, locale)
  } else {
    return handleProtectedRoute(request, response, session, locale)
  }
}

export const config = {
  matcher: [
    "/((?!_next|api|vercel|sitemap\\.xml|robots\\.txt|manifest\\.webmanifest|static(?:\\/.*)?).*)",
  ],
}

function detectLocale(pathname: string): LocaleType | null {
  const { locales } = i18n
  const firstSegment = pathname.split("/")[1]
  return locales.includes(firstSegment as LocaleType)
    ? (firstSegment as LocaleType)
    : null
}

async function authenticateUser(
  request: NextRequest,
  locale: LocaleType,
  response: NextResponse,
): Promise<SessionType | null> {
  const accessToken = request.cookies.get(CookieEnum.ACCESS_TOKEN)?.value
  const refreshToken = request.cookies.get(CookieEnum.REFRESH_TOKEN)?.value
  let session = null

  if (accessToken) {
    session = await AuthService.authenticateWithAccessToken(accessToken)
  } else if (refreshToken) {
    session = await AuthService.authenticateWithRefreshToken(
      refreshToken,
      locale,
      response,
    )
  }

  return session
}

function handlePublicRoute(
  request: NextRequest,
  response: NextResponse,
  session: SessionType | null,
  locale: LocaleType,
): NextResponse {
  const localizedLoginPath = getLocalizedLoginPathname(locale)
  const localizedRegistrationPath = getLocalizedRegistrationPathname(locale)

  // If the user is already logged in, don’t show them login/register pages
  if (
    request.nextUrl.pathname.endsWith(localizedLoginPath) ||
    request.nextUrl.pathname.endsWith(localizedRegistrationPath)
  ) {
    if (session) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = getLocalizedMyProfilePathname(locale)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return response
}

function handleProtectedRoute(
  request: NextRequest,
  response: NextResponse,
  session: SessionType | null,
  locale: LocaleType,
): NextResponse {
  if (session) {
    return response
  } else {
    const toastParams = toastQueryParams(
      t_loginRequired(locale),
      ToastEnum.WARNING,
    )
    const toastParamsString = Object.entries(toastParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join("&")

    const localizedLoginPath = getLocalizedLoginPathname(locale)
    const callbackUrl = encodeURIComponent(request.nextUrl.pathname)
    const loginUrl = `${localizedLoginPath}?callbackUrl=${callbackUrl}&${toastParamsString}`

    // Clear cookies to prevent infinite loop
    response.cookies.delete(CookieEnum.ACCESS_TOKEN)
    response.cookies.delete(CookieEnum.REFRESH_TOKEN)

    return NextResponse.redirect(new URL(loginUrl, request.nextUrl))
  }
}
