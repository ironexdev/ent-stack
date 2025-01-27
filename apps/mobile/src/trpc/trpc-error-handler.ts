import { TRPCClientError } from "@trpc/client"
import type { AppRouterType } from "@backend/api/trpc/root"
import { createTRPCErrorHandler } from "@shared/trpc/create-trpc-error-handler"
import { ZodError } from "zod"
import { TRPCErrorEnum } from "@shared/enums/trpc-error-enum"

type FlattenedZodErrorType = ReturnType<ZodError["flatten"]>
type TrpcErrorCallbacksType = {
  onTRPCServerError?: (
    message: string,
    code: TRPCErrorEnum,
    path?: string,
  ) => void
  onClientError?: (message: string, code: TRPCErrorEnum, path?: string) => void
  onUserError?: (
    message: string,
    code: TRPCErrorEnum,
    path?: string,
    zodError?: FlattenedZodErrorType | null,
  ) => void
}

export function handleTRPCError(
  error: TRPCClientError<AppRouterType>,
  _locale: string, // e.g. "en"
  callbacks: TrpcErrorCallbacksType = {},
) {
  const baseHandler = createTRPCErrorHandler()

  baseHandler(error, {
    onServerError: ({ message, code, path }) => {
      callbacks.onTRPCServerError?.(message, code, path)
    },
    onClientError: ({ message, code, path }) => {
      callbacks.onClientError?.(message, code, path)
    },
    onUserError: ({ message, code, path, zodError }) => {
      callbacks.onUserError?.(message, code, path, zodError)
    },
  })
}
