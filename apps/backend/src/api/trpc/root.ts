import {
  createCallerFactory,
  createTRPCRouter,
  publicQueryProcedure,
} from "@backend/api/trpc/trpc"
import { verificationTokensRouter } from "@backend/api/trpc/routers/verification-tokens-router"
import { refreshTokensRouter } from "@backend/api/trpc/routers/refresh-tokens-router"
import { usersRouter } from "@backend/api/trpc/routers/users-router"

const fooRouter = createTRPCRouter({
  bar: publicQueryProcedure.query(() => {
    return "foo-bar"
  }),
})

export const appRouter = createTRPCRouter({
  refreshTokens: refreshTokensRouter,
  users: usersRouter,
  verificationTokens: verificationTokensRouter,
  foo: fooRouter,
})

export type AppRouterType = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
