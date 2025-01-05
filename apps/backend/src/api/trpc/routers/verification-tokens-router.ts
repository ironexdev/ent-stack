import {
  createTRPCRouter,
  ctxInput,
  publicMutationProcedure,
  publicQueryProcedure,
} from "@backend/api/trpc/trpc"
import {
  refreshTokens,
  users,
  verificationTokens,
} from "@backend/database/schema"
import { VerificationActionEnum } from "@shared/enums/verification-action-enum"
import type {
  InsertVerificationTokenType,
  SelectVerificationTokenType,
} from "@backend/database/schema/verificationTokens"
import { z } from "zod"
import { and, count, eq, lt } from "drizzle-orm"
import { takeOne } from "@backend/database"
import { TRPCError } from "@trpc/server"
import { TRPCErrorEnum } from "@shared/enums/trpc-error-enum"
import BackendConfig from "@backend/config/backend-config"
import {
  t_invalidVerificationPINForLogin,
  t_invalidVerificationPINForRegistration,
  t_tooManyVerificationAttempts,
} from "@shared/i18n/messages/common/t-input-error"
import {
  t_loginSuccess,
  t_registrationSuccess,
  t_verificationPINSent,
} from "@shared/i18n/messages/t-auth"
import SharedJwtService from "@shared/services/shared-jwt-service"
import type { SelectUserType } from "@backend/database/schema/users"
import { CookieEnum } from "@shared/enums/cookie-enum"
import { EnvironmentEnum } from "@shared/enums/environment-enum"
import { logger } from "@backend/index"
import EmailService from "@backend/services/email/email-service"
import SharedConfig from "@shared/config/shared-config"
import {
  vtCreateSchema,
  vtVerifySchema,
} from "@shared/schemas/verification-tokens"
import { FrameworkEnum } from "@shared/enums/framework-enum"
import { generatePIN } from "@backend/lib/utils"
import type { SessionType } from "@shared/types/session-type"
import { env } from "@backend/env"

export const verificationTokensRouter = createTRPCRouter({
  create: publicMutationProcedure
    .input(
      (input: unknown) => input as z.infer<ReturnType<typeof vtCreateSchema>>,
    )
    .use(ctxInput(({ locale }) => vtCreateSchema(locale)))
    .mutation(async ({ ctx }) => {
      const { action, email, loginLink, registrationLink } = ctx.ctxInput

      // Delete all expired tokens (disregard verificationTokens.action)
      // TODO these also need to be deleted via cron
      await ctx.db
        .delete(verificationTokens)
        .where(
          and(
            eq(verificationTokens.email, email),
            lt(verificationTokens.expires, new Date()),
          ),
        )

      // Count existing not expired tokens for the user and action
      const existingNotExpiredTokensCount = await ctx.db
        .select({ count: count() })
        .from(verificationTokens)
        .where(
          and(
            eq(verificationTokens.email, email),
            eq(verificationTokens.action, action),
          ),
        )
        .then((result) => result[0]?.count || 0)

      // If there are {n} or more not expired tokens, do not create a new one and throw and error
      if (
        existingNotExpiredTokensCount >=
        BackendConfig.verificationTokenMaxActiveCount
      ) {
        throw new TRPCError({
          code: TRPCErrorEnum.BAD_REQUEST,
          message: t_tooManyVerificationAttempts(
            ctx.locale,
            BackendConfig.verificationTokenExpirationInMinutes,
          ),
        })
      }

      const user = await ctx.db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .then(takeOne)

      if (!user && action === VerificationActionEnum.LOGIN) {
        // Incorrect action - attempt to login while user was not found in database
        await EmailService.sendLoginAttemptEmail(
          email,
          ctx.locale,
          registrationLink,
        )

        return {
          status: true,
          message: t_verificationPINSent(ctx.locale),
        }
      }

      if (action === VerificationActionEnum.REGISTRATION && user) {
        // Incorrect action - attempt to register while user was found in database
        await EmailService.sendRegistrationAttemptEmail(
          email,
          ctx.locale,
          loginLink,
        )

        return {
          status: true,
          message: t_verificationPINSent(ctx.locale),
        }
      }

      // 6 digit pin
      const pin = generatePIN()

      const tokenData: InsertVerificationTokenType = {
        email,
        action,
        pin,
        expires: new Date(
          Date.now() +
            BackendConfig.verificationTokenExpirationInMinutes * 60 * 1000,
        ),
      }

      // Insert new verification token to the database
      await ctx.db.insert(verificationTokens).values(tokenData)

      if (action === VerificationActionEnum.LOGIN) {
        // Send login e-mail
        await EmailService.sendLoginEmail(email, ctx.locale, pin)
      } else {
        // Send registration e-mail
        await EmailService.sendRegistrationEmail(email, ctx.locale, pin)
      }

      return {
        status: true,
        message: t_verificationPINSent(ctx.locale),
      }
    }),
  verify: publicQueryProcedure
    .input(
      (input: unknown) => input as z.infer<ReturnType<typeof vtVerifySchema>>,
    )
    .use(ctxInput(({ locale }) => vtVerifySchema(locale)))
    .mutation(async ({ ctx }) => {
      const { email, action, pin } = ctx.ctxInput

      const invalidOrExpiredPINError = new TRPCError({
        code: TRPCErrorEnum.BAD_REQUEST,
        message:
          action === VerificationActionEnum.LOGIN
            ? t_invalidVerificationPINForLogin(ctx.locale)
            : t_invalidVerificationPINForRegistration(ctx.locale),
      })

      // Select verification token from database
      // This also validates token action
      const token = (await ctx.db
        .select()
        .from(verificationTokens)
        .where(
          and(
            eq(verificationTokens.email, email),
            eq(verificationTokens.pin, pin),
            eq(verificationTokens.action, action),
          ),
        )
        .then(takeOne)) as SelectVerificationTokenType

      if (!token) {
        logger.warn({
          msg: `Invalid verification PIN for ${action} action.`,
          email,
          action,
        })

        throw invalidOrExpiredPINError
      }

      // Check if token is expired
      if (token.expires < new Date()) {
        logger.warn({
          msg: `Expired verification PIN for ${action} action.`,
          email,
          action,
          expiration: token.expires,
          currentDate: new Date(),
        })

        throw invalidOrExpiredPINError
      }

      // PIN is verified - now remove the token from the database
      await ctx.db
        .delete(verificationTokens)
        .where(eq(verificationTokens.id, token.id))

      let user

      if (action === VerificationActionEnum.LOGIN) {
        // Login - select user from database

        user = (await ctx.db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .then(takeOne)) as SelectUserType

        if (!user) {
          logger.warn({
            msg: "Attempt to login failed, because the user was not found in database.",
            email,
            action,
          })

          throw invalidOrExpiredPINError
        }
      } else {
        // Registration - create new user
        await ctx.db.insert(users).values({
          email,
        })

        user = (await ctx.db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .then(takeOne)) as SelectUserType

        // This should not happen here because the user was just created
        if (!user) {
          logger.warn({
            msg: "Attempt to register failed, because the user was not found in database, right after creation (should not happen).",
            email,
            action,
          })

          throw invalidOrExpiredPINError
        }
      }

      const userId = user.id
      const active = !!user.emailVerified // User is created after the e-mail is verified
      const session = { email, active } as SessionType

      const accessToken = await SharedJwtService.createJWT(
        session,
        SharedConfig.accessTokenExpirationInMinutes,
        env.JWT_SECRET,
      )

      const refreshTokenExpirationDate = new Date(
        Date.now() + SharedConfig.refreshTokenExpirationInMinutes * 60 * 1000,
      )

      const refreshToken = crypto.randomUUID()
      await ctx.db.insert(refreshTokens).values({
        code: refreshToken,
        userId,
        expires: refreshTokenExpirationDate,
      })

      ctx.res.cookie(
        CookieEnum.ACCESS_TOKEN,
        accessToken,
        SharedConfig.cookieOptions.accessToken(
          env.COOKIE_DOMAIN,
          env.NODE_ENV as EnvironmentEnum,
          FrameworkEnum.EXPRESS,
        ),
      )

      ctx.res.cookie(
        CookieEnum.REFRESH_TOKEN,
        refreshToken,
        SharedConfig.cookieOptions.refreshToken(
          env.COOKIE_DOMAIN,
          env.NODE_ENV as EnvironmentEnum,
          FrameworkEnum.EXPRESS,
        ),
      )

      return {
        status: true,
        message:
          action === VerificationActionEnum.LOGIN
            ? t_loginSuccess(ctx.locale)
            : t_registrationSuccess(ctx.locale),
        accessToken,
        refreshToken,
      }
    }),
})
