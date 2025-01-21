import cors from "cors"
import express from "express"
import { appRouter } from "@backend/api/trpc/root"
import * as trpcExpress from "@trpc/server/adapters/express"
import { createTRPCContext } from "@backend/api/trpc/trpc"
import { localeFromReq, resolvePath } from "@backend/lib/utils"
import pino, { type Logger } from "pino"
import pinoHttp from "pino-http"
import { IncomingMessage } from "http"
import { ServerResponse } from "http"
import { Resend } from "resend"
import emailTestRouter from "@backend/emails/email-test-router"
import cookieParser from "cookie-parser"
import type { Request, Response } from "express"
import { t_serverError } from "@shared/i18n/messages/common/t-error"
import LoggerService from "@backend/services/logger-service"
import { ErrorService } from "@backend/services/error-service"
import { EnvironmentEnum } from "@shared/enums/environment-enum"
import { HttpStatusEnum } from "@shared/enums/http-status-enum"
import { v4 as uuidv4 } from "uuid"
import { RequestHeaderEnum } from "@shared/enums/request-header-enum"
import { LoggerErrorEnum } from "@shared/enums/logger-error-enum"
import { env } from "@backend/env"
import { LogLevelEnum } from "@shared/enums/log-level-enum"
import { db } from "@backend/database"
import { sql } from "drizzle-orm"

const port = env.PORT

export const app = express()

// CORS
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }))

// JSON parser
app.use(express.json())

// Email service
export const mailer = new Resend(env.RESEND_API_KEY)

// Logger
export const logger: Logger<LogLevelEnum.INFO> = pino({
  base: null,
  level: env.LOG_LEVEL,
})

app.use(
  pinoHttp({
    logger,
    genReqId: (req) => {
      const requestId = req.headers[RequestHeaderEnum.REQUEST_ID]

      if (requestId) {
        return requestId
      } else {
        return "no-request-id|" + uuidv4() // This means, that client did not send a RequestHeaderEnum.REQUEST_ID header
      }
    },
    serializers: {
      req: (req: IncomingMessage) => LoggerService.serializeRequest(req),
      res: (res: ServerResponse) => LoggerService.serializeResponse(res),
    },
    useLevel: LogLevelEnum.INFO,
  }),
)

/// Cookie parser
app.use(cookieParser())

// Public files
app.use(express.static(resolvePath("static/public")))

// Index route
app.get(
  "/",
  ErrorService.handleAsyncErrors(async (req, res) => {
    const locale = localeFromReq(req)

    res.json({
      message: `Lok'tar ogar!`,
      frontendUrl: env.FRONTEND_URL,
      locale,
      cookies: req.cookies,
    })
  }),
)

app.get(
  "/liveness",
  ErrorService.handleAsyncErrors(async (req, res) => {
    res.status(HttpStatusEnum.OK).json({
      message: "Server is LIVE",
    })
  }),
)

app.get(
  "/readiness",
  ErrorService.handleAsyncErrors(async (req, res) => {
    const [error] = await ErrorService.catchAsyncError(
      db.execute(sql`SELECT 1`),
    )

    if (error) {
      logger.error({
        msg: "Database is not ready",
        type: LoggerErrorEnum.SERVER_ERROR,
        error,
      })
    }

    if (!error) {
      res.status(HttpStatusEnum.OK).json({
        message: "Server is READY",
      })
    } else {
      res.status(HttpStatusEnum.SERVICE_UNAVAILABLE).json({
        message: "Server is NOT READY",
      })
    }
  }),
)

// TRPC
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  }),
)

// Route for testing (viewing) email templates
if (env.NODE_ENV === EnvironmentEnum.DEVELOPMENT) {
  app.get("/email/:wildcard", emailTestRouter)
}

// 404
app.use((req, res) => {
  const locale = localeFromReq(req)

  res.status(HttpStatusEnum.NOT_FOUND).json({
    message: "Kek!",
    locale,
  })
})

// Error handler
app.use((error: Error, req: Request, res: Response) => {
  const locale = localeFromReq(req)

  logger.error({
    msg: "Unhandled error caught by the error handler middleware",
    type: LoggerErrorEnum.SERVER_ERROR,
    error,
  })

  res.status(HttpStatusEnum.INTERNAL_SERVER_ERROR).send({
    message: t_serverError(locale),
    // Only send error message in development environment
    ...(env.NODE_ENV === EnvironmentEnum.DEVELOPMENT && {
      error: error.message,
    }),
  })
})

// Run the server
app.listen(port, () => {
  logger.info({
    msg: `Backend server started and running on ${env.BACKEND_URL}`,
  })
})

// Log uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.fatal({
    msg: "Fatal error - backend server is shutting down",
    type: LoggerErrorEnum.FATAL_SERVER_ERROR,
    error,
  })

  process.exit(1)
})
