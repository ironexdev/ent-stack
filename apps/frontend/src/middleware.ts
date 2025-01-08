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

  // 1. Handle homepage redirect
  if (pathname === "/") {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = `/${i18n.defaultLocale}`
    return NextResponse.redirect(redirectUrl)
  }

  const routeName = indexedRoutes[pathname]

  // 2. Handle 404
  if (!routeName) {
    const notFoundUrl = request.nextUrl.clone()
    notFoundUrl.pathname = "/404" // Ensure this matches your custom 404 page route
    return NextResponse.rewrite(notFoundUrl)
  }

  // 3. Handle rewrite to canonical pathname if needed
  const response = handleCanonicalRewrite(request, routeName)

  // 4. Detect locale and determine protected/public route
  const locale = detectLocale(request.nextUrl.pathname)
  const isProtectedPage = protectedPathnameRegex.test(request.nextUrl.pathname)

  // 5. Attempt to authenticate user
  const session = await authenticateUser(request, locale, response)

  // 6. Route-level logic
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

function detectLocale(pathname: string): LocaleType {
  const { locales, defaultLocale } = i18n
  const firstSegment = pathname.split("/")[1]

  if (locales.includes(firstSegment as LocaleType)) {
    return firstSegment as LocaleType
  }

  return defaultLocale
}

function handleCanonicalRewrite(
  request: NextRequest,
  routeName: string,
): NextResponse {
  const { pathname } = request.nextUrl
  const isCanonicalPathname = pathname.endsWith(routeName)

  if (!isCanonicalPathname) {
    const url = request.nextUrl.clone()
    url.pathname = `${i18n.defaultLocale}${routeName}`
    return NextResponse.rewrite(url)
  } else {
    return NextResponse.next()
  }
}

async function authenticateUser(
  request: NextRequest,
  locale: LocaleType,
  response: NextResponse,
) {
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

  // Redirect to my-profile if user is logged in and tries to access login/registration
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
