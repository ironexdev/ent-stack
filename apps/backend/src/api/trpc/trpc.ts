import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"
import { z, ZodError } from "zod"
import express from "express"
import { db } from "@backend/database"
import {
  trpcClientErrors,
  TRPCErrorEnum,
  trpcServerErrors,
  trpcUserErrors,
} from "@shared/enums/trpc-error-enum"
import { EnvironmentEnum } from "@shared/enums/environment-enum"
import { localeFromReq } from "@backend/lib/utils"
import {
  t_clientError,
  t_serverError,
} from "@shared/i18n/messages/common/t-error"
import SharedConfig from "@shared/config/shared-config"
import type { DefaultErrorShape } from "@trpc/server/unstable-core-do-not-import"
import sanitizeHtml from "sanitize-html"
import { logger } from "@backend/index"
import { CookieEnum } from "@shared/enums/cookie-enum"
import { t_loginRequired } from "@shared/i18n/messages/t-auth"
import type { SessionType } from "@shared/types/session-type"
import AuthService from "@backend/services/auth-service"
import { LoggerErrorEnum } from "@shared/enums/logger-error-enum"
import { env } from "@backend/env"

export type TRPCContextType = Awaited<ReturnType<typeof createTRPCContext>>
export type TRPCAuthenticatedContextType = TRPCContextType & {
  session: SessionType
}

export function createTRPCContext({
  req,
  res,
}: {
  req: express.Request
  res: express.Response
}) {
  const locale = localeFromReq(req)

  return {
    req,
    res,
    db,
    locale,
  }
}

export type FlattenedZodErrorType = ReturnType<ZodError["flatten"]>

type ErrorShapeType = Omit<DefaultErrorShape, "data"> & {
  code: DefaultErrorShape["code"]
  message: DefaultErrorShape["message"]
  data: {
    httpStatus: DefaultErrorShape["data"]["httpStatus"]
    path?: DefaultErrorShape["data"]["path"]
    stack?: DefaultErrorShape["data"]["stack"]
    code: TRPCErrorEnum
    zodError: FlattenedZodErrorType | null
  }
  devOnly?: {
    disclaimer: string
    userLandErrorCodes: string
  }
}

const t = initTRPC.context<TRPCContextType>().create({
  transformer: superjson,
  errorFormatter({ ctx, shape, error }): ErrorShapeType {
    const locale = ctx ? ctx.locale : SharedConfig.defaultLocale
    const productionClientErrorCode = TRPCErrorEnum.BAD_REQUEST
    const productionClientErrorMessage = t_clientError(locale)
    const productionServerErrorCode = TRPCErrorEnum.INTERNAL_SERVER_ERROR
    const productionServerErrorMessage = t_serverError(locale)

    const myError = {
      name: error.name,
      code: error.code,
      cause: error.cause,
      stack: error.stack,
    }

    // Client-side errors
    if (trpcClientErrors.includes(myError.code as TRPCErrorEnum)) {
      logger.error({
        msg: `Client error occured in TRPC procedure`,
        type: LoggerErrorEnum.TRPC_CLIENT_ERROR,
        error: myError,
      })

      if (env.NODE_ENV === EnvironmentEnum.DEVELOPMENT) {
        return {
          ...shape,
          data: {
            ...shape.data,
            code: myError.code as TRPCErrorEnum,
            zodError: null, // Adding zodError for type inference in client
          },
          // Just a warning, feel free to remove this (also from ErrorShapeInterface)
          devOnly: {
            disclaimer:
              "In production, generic client error message will be returned instead of specific 'message'.",
            userLandErrorCodes: `Following TRPC error codes fall under userland errors, messages from those codes are translated and can be shown to the user: ${trpcUserErrors.toString()}`,
          },
        }
      } else {
        return {
          ...shape,
          message: productionClientErrorMessage,
          data: {
            ...shape.data,
            code: productionClientErrorCode,
            zodError: null, // Adding zodError for type inference in client
          },
        }
      }
    }

    // Server-side errors
    if (trpcServerErrors.includes(myError.code as TRPCErrorEnum)) {
      logger.error({
        msg: `Server error occured in TRPC procedure`,
        type: LoggerErrorEnum.TRPC_SERVER_ERROR,
        // Adding error: error is not enough here
        error: myError,
      })

      if (env.NODE_ENV === EnvironmentEnum.DEVELOPMENT) {
        return {
          ...shape,
          data: {
            ...shape.data,
            code: myError.code as TRPCErrorEnum,
            zodError: null, // Adding zodError for type inference in client
          },
          // Just a warning, feel free to remove this (also from ErrorShapeInterface)
          devOnly: {
            disclaimer:
              "In production, generic server error message will be returned instead of specific 'message'.",
            userLandErrorCodes: `Following TRPC error codes fall under userland errors, messages from those codes are translated and can be shown to the user: ${trpcUserErrors.toString()}`,
          },
        }
      } else {
        return {
          ...shape,
          message: productionServerErrorMessage,
          data: {
            ...shape.data,
            code: productionServerErrorCode,
            zodError: null, // Adding zodError for type inference in client
          },
        }
      }
    }

    // Userland errors
    logger.warn({
      msg: `Userland error occured in TRPC procedure`,
      type: LoggerErrorEnum.TRPC_USERLAND_ERROR,
      error: myError,
    })

    return {
      ...shape,
      message:
        myError.cause instanceof ZodError
          ? myError.cause.issues[0]?.message || "Validation error"
          : shape.message, // Convert Zod error stringified json to plain string
      data: {
        ...shape.data,
        code: myError.code as TRPCErrorEnum,
        zodError:
          myError.cause instanceof ZodError
            ? (myError.cause.flatten() as FlattenedZodErrorType)
            : null,
      },
    }
  },
})

export const createCallerFactory = t.createCallerFactory

export const createTRPCRouter = t.router

/**
 * Middleware for timing procedure execution and adding an articifial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = t.middleware(async ({ ctx, next, path }) => {
  // const start = Date.now()
  if (env.NODE_ENV === EnvironmentEnum.DEVELOPMENT) {
    // Artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100

    await new Promise((resolve) => setTimeout(resolve, waitMs))
  }

  // const end = Date.now()
  // logger.info({msg: `[TRPC] ${path} took ${end - start}ms to execute`})

  return await next()
})

// Middleware to provide context for input validation
// Also sanitizes input
export const ctxInput = <T extends z.ZodType>(
  getZodType: (ctx: TRPCContextType) => T,
) =>
  t.middleware(async ({ ctx, input, next }) => {
    try {
      let ctxInput = (await getZodType(ctx).parseAsync(input)) as z.infer<T>
      // Sanitize the input
      ctxInput = Object.fromEntries(
        Object.entries(ctxInput).map(([key, value]) => [
          key,
          typeof value === "string" ? sanitizeHtml(value) : value,
        ]),
      ) as z.infer<T>

      return next({
        ctx: {
          ...ctx,
          ctxInput,
        },
      })
    } catch (cause) {
      if (cause instanceof TRPCError) {
        throw cause
      } else {
        throw new TRPCError({
          code: TRPCErrorEnum.BAD_REQUEST,
          cause,
        })
      }
    }
  })

// AUTHENTICATION middleware - checks if user is authenticated, not if user is authorized
// HTTP response code for 401 should be named "Unauthenticated" instead of "Unauthorized"
const authenticationMiddleware = t.middleware(async ({ ctx, next, path }) => {
  const session = await AuthService.authenticate(
    ctx.req.cookies[CookieEnum.ACCESS_TOKEN],
    ctx.req.cookies[CookieEnum.REFRESH_TOKEN],
    ctx.db,
  )

  if (!session) {
    throw new TRPCError({
      code: TRPCErrorEnum.UNAUTHORIZED, // Better name for this HTTP code would be UNAUTHENTICATED
      message: t_loginRequired(ctx.locale),
    })
  }

  logger.info({ requestId: ctx.req.id, userId: session.id })

  return next({
    ctx: { ...ctx, session },
  })
})

export const publicQueryProcedure = t.procedure.use(timingMiddleware)

export const protectedQueryProcedure = t.procedure
  .use(timingMiddleware)
  .use(authenticationMiddleware)

export const publicMutationProcedure = t.procedure.use(timingMiddleware)

export const protectedMutationProcedure = t.procedure
  .use(timingMiddleware)
  .use(authenticationMiddleware)
