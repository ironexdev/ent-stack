import { TRPCClientError, TRPCClientErrorLike } from "@trpc/client"
import type { AppRouterType } from "@backend/api/trpc/root"
import {
  TRPCErrorEnum,
  trpcClientErrors,
  trpcServerErrors,
} from "@shared/enums/trpc-error-enum"
import { type LocaleType } from "@shared/i18n/t"
import { ZodError } from "zod"

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
  locale: LocaleType,
  callbacks: TrpcErrorCallbacksType = {},
) {
  const {
    onTRPCServerError = () => {
      // Should be logged by the server
    },
    onClientError = () => {
      // Should be logged by the server
    },
    onUserError = () => {
      // Might be logged by the server (as a warning)
    },
  } = callbacks

  const typedError = error as TRPCClientErrorLike<AppRouterType>
  const { message, data } = typedError
  const code = data?.code || TRPCErrorEnum.INTERNAL_SERVER_ERROR
  const path = data?.path
  const zodError = data?.zodError

  if ([...trpcServerErrors].includes(code)) {
    onTRPCServerError(message, code, path)
  } else if ([...trpcClientErrors].includes(code)) {
    onClientError(message, code, path)
  } else {
    onUserError(message, code, path, zodError)
  }
}
