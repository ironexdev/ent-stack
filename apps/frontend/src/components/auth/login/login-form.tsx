"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { trpcClientReact } from "@frontend/trpc/trpc-client-react"
import { TRPCClientError, TRPCClientErrorLike } from "@trpc/client"
import type { AppRouterType } from "@backend/api/trpc/root"
import { TRPCErrorEnum, trpcUserErrors } from "@shared/enums/trpc-error-enum"
import { useToast } from "@frontend/hooks/use-toast"
import { t_inputError } from "@shared/i18n/messages/common/t-input-error"
import { handleInputFieldErrors, toastQueryParams } from "@frontend/lib/utils"
import { useState } from "react"
import {
  t_alreadyHaveThePin,
  t_loginSubmit,
  t_loginTitle,
} from "@shared/i18n/messages/t-auth"
import useLocale from "@frontend/hooks/use-locale"
import Loader from "@frontend/components/status-indicator/loader"
import MyButton from "@frontend/components/user-input/my-button"
import FormInputField from "@frontend/components/form/form-input-field"
import { vtCreateSchema } from "@shared/schemas/verification-tokens"
import { ToastEnum } from "@frontend/enums/toast-enum"
import { useAuthActions } from "@frontend/stores/auth-store"
import NavLink from "@frontend/components/navigation/nav-link"
import { VerificationActionEnum } from "@shared/enums/verification-action-enum"
import {
  t_emailLabel,
  t_emailPlaceholder,
} from "@shared/i18n/messages/common/t-input"
import {
  getLocalizedLoginLink,
  getLocalizedLoginPathname,
  getLocalizedPathname,
  getLocalizedRegistrationLink,
  getLocalizedRegistrationPathname,
} from "@frontend/lib/navigation"
import { clientEnv } from "@frontend/env/client-env"
import { useRouter } from "next/navigation"

type FormDataType = z.infer<ReturnType<typeof vtCreateSchema>>

export default function LoginForm() {
  // Async state
  const loginMutation = trpcClientReact.verificationTokens.create.useMutation()
  // Store
  const { setEmail } = useAuthActions()
  // Local state
  const [isLoading, setIsLoading] = useState(false)
  // Utils
  const locale = useLocale()
  const router = useRouter()
  const toast = useToast({ locale })
  // Form
  const formSchema = vtCreateSchema(locale)
  const loginLink = getLocalizedLoginLink(locale)
  const registrationLink = getLocalizedRegistrationLink(locale)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onChange",
    defaultValues: {
      action: VerificationActionEnum.LOGIN,
      loginLink,
      registrationLink,
    },
  })

  return (
    <>
      <h1 className="w-full text-center text-3xl text-primary">
        {t_loginTitle(locale)}
      </h1>
      <form
        className="mt-12"
        onSubmit={handleSubmit((formData) => onSubmit(formData))}
        noValidate
      >
        <FormInputField
          name="email"
          register={register}
          label={t_emailLabel(locale)}
          placeholder={t_emailPlaceholder(locale)}
          error={errors.email}
          type="email"
        />
        <div className="mt-12 flex w-full justify-center px-5">
          <MyButton disabled={isLoading} type="submit">
            {isLoading ? <Loader /> : t_loginSubmit(locale)}
          </MyButton>
        </div>
        <div className="mt-8 flex w-full justify-end">
          <NavLink
            href="/login/verification"
            className="text-sm text-secondary hover:text-primary"
          >
            {t_alreadyHaveThePin(locale)}
          </NavLink>
        </div>
      </form>
    </>
  )

  function onSubmit(formData: FormDataType): void {
    setIsLoading(true)

    setEmail(formData.email)

    loginMutation.mutate(
      {
        email: formData.email,
        action: formData.action,
        loginLink: `${clientEnv.NEXT_PUBLIC_FRONTEND_URL}/${getLocalizedLoginPathname(locale)}`,
        registrationLink: `${clientEnv.NEXT_PUBLIC_FRONTEND_URL}/${getLocalizedRegistrationPathname(locale)}`,
      },
      {
        onSuccess: (data) => {
          router.push(
            getLocalizedPathname(
              locale,
              "/login/verification",
              toastQueryParams(data.message, ToastEnum.SUCCESS),
            ),
          )
        },
        onError: (error: unknown) => {
          setIsLoading(false)

          if (error instanceof TRPCClientError) {
            const typedError = error as TRPCClientErrorLike<AppRouterType>
            const { message, data } = typedError
            const code = data?.code || TRPCErrorEnum.INTERNAL_SERVER_ERROR
            const zodError = data?.zodError

            if (trpcUserErrors.includes(code)) {
              if (zodError) {
                const { fieldErrors } = zodError

                toast.error(t_inputError(locale))
                handleInputFieldErrors(fieldErrors, setError)
              } else {
                toast.error(message)
              }
            }
          }
        },
      },
    )
  }
}
