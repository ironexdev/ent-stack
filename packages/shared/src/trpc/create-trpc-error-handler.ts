import { TRPCClientError, TRPCClientErrorLike } from "@trpc/client"
import type { AppRouterType } from "@backend/api/trpc/root"
import {
  TRPCErrorEnum,
  trpcClientErrors,
  trpcServerErrors,
} from "@shared/enums/trpc-error-enum"
import { ZodError } from "zod"

export type FlattenedZodErrorType = ReturnType<ZodError["flatten"]>

export type TRPCErrorHandlerCallbacks = {
  onServerError?: (params: {
    message: string
    code: TRPCErrorEnum
    path?: string
  }) => void
  onClientError?: (params: {
    message: string
    code: TRPCErrorEnum
    path?: string
  }) => void
  onUserError?: (params: {
    message: string
    code: TRPCErrorEnum
    path?: string
    zodError?: FlattenedZodErrorType | null
  }) => void
}

export function createTRPCErrorHandler(
  defaultCallbacks?: TRPCErrorHandlerCallbacks,
) {
  return function handleTRPCError(
    error: TRPCClientError<AppRouterType>,
    overrideCallbacks: TRPCErrorHandlerCallbacks = {},
  ) {
    const typedError = error as TRPCClientErrorLike<AppRouterType>
    const { message, data } = typedError
    const code = data?.code ?? TRPCErrorEnum.INTERNAL_SERVER_ERROR
    const path = data?.path
    const zodError = data?.zodError

    const {
      onServerError = () => {},
      onClientError = () => {},
      onUserError = () => {},
    } = { ...defaultCallbacks, ...overrideCallbacks }

    if (trpcServerErrors.includes(code)) {
      onServerError({ message, code, path })
    } else if (trpcClientErrors.includes(code)) {
      onClientError({ message, code, path })
    } else {
      onUserError({ message, code, path, zodError })
    }
  }
}
