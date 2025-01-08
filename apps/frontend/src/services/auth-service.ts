import { cookies } from "next/headers"
import SharedAuthService from "@shared/services/shared-auth-service"
import { CookieEnum } from "@shared/enums/cookie-enum"
import { type SessionType } from "@shared/types/session-type"
import { serverEnv } from "@frontend/env/server-env"
import { type LocaleType } from "@shared/i18n/t"
import { NextResponse } from "next/server"
import { ErrorService } from "@frontend/services/error-service"
import trpcClient from "@frontend/trpc/trpc-client"
import SharedConfig from "@shared/config/shared-config"
import { clientEnv } from "@frontend/env/client-env"
import { FrameworkEnum } from "@shared/enums/framework-enum"
import { EnvironmentEnum } from "@shared/enums/environment-enum"

export default class AuthService extends SharedAuthService {
  static async authenticateWithAccessToken(
    accessToken: string,
  ): Promise<SessionType | null> {
    return await SharedAuthService.authenticateWithAccessToken(
      accessToken,
      serverEnv.JWT_SECRET,
    )
  }

  static async getSession(): Promise<SessionType | null> {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get(CookieEnum.ACCESS_TOKEN)?.value

    return accessToken
      ? await this.authenticateWithAccessToken(accessToken)
      : null
  }

  // Can't set cookie in the backend, because this is server-to-server request, so this method needs to be called from the middleware
  static async authenticateWithRefreshToken(
    refreshToken: string,
    locale: LocaleType,
    res: NextResponse,
  ): Promise<SessionType | null> {
    const [error, result] = await ErrorService.catchAsyncError(
      // This mutate is not from react-query, but from trpc and it returns a promise
      trpcClient(locale).refreshTokens.verify.mutate({ refreshToken }),
    )

    if (error) {
      // Should be logged by the server
    }

    if (result) {
      const { accessToken: newAccessToken } = result

      res.cookies.set(
        CookieEnum.ACCESS_TOKEN,
        newAccessToken,
        SharedConfig.cookieOptions.accessToken(
          clientEnv.NEXT_PUBLIC_COOKIE_DOMAIN,
          clientEnv.NEXT_PUBLIC_NODE_ENV as EnvironmentEnum,
          FrameworkEnum.NEXT,
        ),
      )

      return await this.authenticateWithAccessToken(newAccessToken)
    }

    return null
  }
}
