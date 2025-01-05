import { LocaleType } from "@shared/i18n/t"
import { LocaleEnum } from "@shared/enums/locale-enum"
import { EnvironmentEnum } from "@shared/enums/environment-enum"
import { FrameworkEnum } from "@shared/enums/framework-enum"

export default class SharedConfig {
  static readonly defaultLocale: LocaleType = LocaleEnum.EN
  static readonly accessTokenExpirationInMinutes = 30
  static readonly refreshTokenExpirationInMinutes = 10080 // 7 days

  static readonly cookieOptions = {
    accessToken: (
      domain: string,
      environment: EnvironmentEnum,
      framework: FrameworkEnum,
    ) => {
      const multiplier = framework === FrameworkEnum.NEXT ? 1 : 1000 // Next.js uses milliseconds, Express uses seconds

      return {
        httpOnly: true,
        path: "/",
        domain,
        secure: environment !== EnvironmentEnum.DEVELOPMENT,
        sameSite: "strict" as "strict", // Use this if backend is running on subdomain, ie.: backend.example.com and frontend is running on example.com
        maxAge: (this.accessTokenExpirationInMinutes - 1) * 60 * multiplier, // Subtract 1 minute to account for clock skew
      }
    },
    refreshToken: (
      domain: string,
      environment: EnvironmentEnum,
      framework: FrameworkEnum,
    ) => {
      const multiplier = framework === FrameworkEnum.NEXT ? 1 : 1000 // Next.js uses milliseconds, Express uses seconds

      return {
        httpOnly: true,
        path: "/",
        domain,
        secure: environment !== EnvironmentEnum.DEVELOPMENT,
        sameSite: "strict" as "strict", // Use this if backend is running on subdomain, ie.: backend.example.com and frontend is running on example.com
        maxAge: (this.refreshTokenExpirationInMinutes - 1) * 60 * multiplier, // Subtract 1 minute to account for clock skew
      }
    },
  }
}
