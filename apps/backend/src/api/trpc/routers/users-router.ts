import {
  createTRPCRouter,
  protectedQueryProcedure,
} from "@backend/api/trpc/trpc"
import { TRPCError } from "@trpc/server"
import { TRPCErrorEnum } from "@shared/enums/trpc-error-enum"
import { t_loginRequired } from "@shared/i18n/messages/t-auth"
import UserService from "@backend/services/user-service"

export const usersRouter = createTRPCRouter({
  getCurrent: protectedQueryProcedure.query(async ({ ctx }) => {
    const session = ctx.session

    const user = await UserService.selectUserByEmail(session.email)

    if (!user) {
      // User not found, this should not happen, so just return unauthenticated
      throw new TRPCError({
        code: TRPCErrorEnum.UNAUTHORIZED, // Better name for this HTTP code would be UNAUTHENTICATED
        message: t_loginRequired(ctx.locale),
      })
    }

    return {
      user: {
        email: user.email,
      },
    }
  }),
})
