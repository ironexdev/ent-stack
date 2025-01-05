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
import {
  t_loginVerificationTitle,
  t_loginVerify,
} from "@shared/i18n/messages/t-auth"
import useLocale from "@frontend/hooks/use-locale"
import MyButton from "@frontend/components/user-input/my-button"
import Loader from "@frontend/components/status-indicator/loader"
import FormInputField from "@frontend/components/form/form-input-field"
import { vtVerifySchema } from "@shared/schemas/verification-tokens"
import MyInput from "@frontend/components/user-input/my-input"
import { useAuthEmail } from "@frontend/stores/auth-store"
import { ToastEnum } from "@frontend/enums/toast-enum"
import { VerificationActionEnum } from "@shared/enums/verification-action-enum"
import {
  t_emailLabel,
  t_emailPlaceholder,
  t_pinLabel,
  t_pinPlaceholder,
} from "@shared/i18n/messages/common/t-input"
import { useState } from "react"
import { getLocalizedPathname } from "@frontend/lib/navigation"

type FormDataType = z.infer<ReturnType<typeof vtVerifySchema>>

export default function LoginVerificationForm() {
  // Store
  const email = useAuthEmail()
  // Local state
  const [isLoading, setIsLoading] = useState(false)
  // Utils
  const locale = useLocale()
  const toast = useToast({ locale })
  // Form
  const formSchema = vtVerifySchema(locale)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onChange",
    defaultValues: {
      email: email ?? undefined,
    },
  })

  const verificationMutation =
    trpcClientReact.verificationTokens.verify.useMutation()

  return (
    <>
      <h1 className="w-full text-center text-3xl text-primary">
        {t_loginVerificationTitle(locale)}
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
        <FormInputField
          className="mt-6"
          name="pin"
          register={register}
          label={t_pinLabel(locale)}
          placeholder={t_pinPlaceholder(locale)}
          error={errors.pin}
          type="text"
        />
        <MyInput
          {...register("action")}
          type="hidden"
          value={VerificationActionEnum.LOGIN}
        />
        <div className="mt-12 flex w-full justify-center">
          <MyButton disabled={isLoading} type="submit">
            {isLoading ? <Loader /> : t_loginVerify(locale)}
          </MyButton>
        </div>
      </form>
    </>
  )

  function onSubmit(formData: FormDataType): void {
    setIsLoading(true)

    verificationMutation.mutate(
      {
        email: formData.email,
        pin: formData.pin,
        action: formData.action,
      },
      {
        onSuccess: async (data) => {
          // Redirect with reload to reset app state
          location.href = getLocalizedPathname(
            locale,
            "/my-profile",
            toastQueryParams(data.message, ToastEnum.SUCCESS),
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
