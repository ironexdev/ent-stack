import { createCallerFactory, createTRPCRouter } from "@backend/api/trpc/trpc"
import { verificationTokensRouter } from "@backend/api/trpc/routers/verification-tokens-router"
import { refreshTokensRouter } from "@backend/api/trpc/routers/refresh-tokens-router"
import { usersRouter } from "@backend/api/trpc/routers/users-router"

export const appRouter = createTRPCRouter({
  refreshTokens: refreshTokensRouter,
  users: usersRouter,
  verificationTokens: verificationTokensRouter,
})

export type AppRouterType = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
