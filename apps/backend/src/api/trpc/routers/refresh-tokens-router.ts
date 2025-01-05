import {
  createTRPCRouter,
  ctxInput,
  publicMutationProcedure,
} from "@backend/api/trpc/trpc"
import { t_invalidOrExpiredRefreshToken } from "@shared/i18n/messages/common/t-input-error"
import { refreshTokens } from "@backend/database/schema"
import { eq } from "drizzle-orm"
import { takeOne } from "@backend/database"
import { TRPCError } from "@trpc/server"
import { TRPCErrorEnum } from "@shared/enums/trpc-error-enum"
import SharedConfig from "@shared/config/shared-config"
import { EnvironmentEnum } from "@shared/enums/environment-enum"
import { CookieEnum } from "@shared/enums/cookie-enum"
import { z } from "zod"
import { rtVerifySchema } from "@shared/schemas/refresh-tokens"
import { FrameworkEnum } from "@shared/enums/framework-enum"
import AuthService from "@backend/services/auth-service"
import { logger } from "@backend/index"
import { LoggerErrorEnum } from "@shared/enums/logger-error-enum"
import { env } from "@backend/env"

export const refreshTokensRouter = createTRPCRouter({
  verify: publicMutationProcedure
    .input(
      (input: unknown) => input as z.infer<ReturnType<typeof rtVerifySchema>>,
    )
    .use(ctxInput(({ locale }) => rtVerifySchema(locale)))
    .mutation(async ({ ctx }) => {
      const { refreshToken } = ctx.ctxInput

      const accessToken = await AuthService.authenticateWithRefreshToken(
        refreshToken,
        ctx.db,
      )

      if (!accessToken) {
        throw new TRPCError({
          code: TRPCErrorEnum.FORBIDDEN,
          message: t_invalidOrExpiredRefreshToken(ctx.locale),
        })
      }

      return {
        status: true,
        accessToken,
      }
    }),
  delete: publicMutationProcedure.mutation(async ({ ctx }) => {
    // Delete access token from cookies
    const accessTokenCookieOptions = SharedConfig.cookieOptions.accessToken(
      env.COOKIE_DOMAIN,
      env.NODE_ENV as EnvironmentEnum,
      FrameworkEnum.EXPRESS,
    )
    ctx.res.clearCookie(CookieEnum.ACCESS_TOKEN, {
      domain: accessTokenCookieOptions.domain,
      path: accessTokenCookieOptions.path,
    })

    // Delete refresh token from cookies
    const refreshTokenCookieOptions = SharedConfig.cookieOptions.refreshToken(
      env.COOKIE_DOMAIN!,
      env.NODE_ENV as EnvironmentEnum,
      FrameworkEnum.EXPRESS,
    )
    ctx.res.clearCookie(CookieEnum.REFRESH_TOKEN, {
      domain: refreshTokenCookieOptions.domain,
      path: refreshTokenCookieOptions.path,
    })

    const refreshToken = ctx.req.cookies[CookieEnum.REFRESH_TOKEN]

    if (!refreshToken) {
      logger.warn({
        msg: "No refresh token found in cookies. Returned success anyway since it happened during logout.",
        type: LoggerErrorEnum.TRPC_USERLAND_ERROR,
      })

      return {
        status: true,
      }
    }

    const refreshTokenEntity = await ctx.db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.code, refreshToken))
      .then(takeOne)

    if (!refreshTokenEntity) {
      logger.warn({
        msg: "No refresh token found in the database. Returned success anyway since it happened during logout.",
        type: LoggerErrorEnum.TRPC_USERLAND_ERROR,
      })

      return {
        status: true,
      }
    }

    if (refreshTokenEntity.expires <= new Date()) {
      logger.warn({
        msg: "Refresh token in the database is expired. Returned success anyway since it happened during logout.",
        type: LoggerErrorEnum.TRPC_USERLAND_ERROR,
      })

      return {
        status: true,
      }
    }

    // Remove all refresh tokens associated with the user
    await ctx.db
      .delete(refreshTokens)
      .where(eq(refreshTokens.userId, refreshTokenEntity.userId))

    return {
      status: true,
    }
  }),
})
