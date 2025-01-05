import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { escapeDangerHtml5Entities } from "xss"
import { FieldErrors, FieldValues } from "react-hook-form"
import { ToastEnum } from "@frontend/enums/toast-enum"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function escapeHTML(content: string): string {
  return escapeDangerHtml5Entities(content)
}

export function handleInputFieldErrors<FormDataType extends FieldValues>(
  fieldErrors: FieldErrors<FormDataType>,
  setError: (
    name: keyof FormDataType,
    error: { type: string; message: string },
  ) => void,
): void {
  Object.entries(fieldErrors).forEach(([field, errors]) => {
    if (errors && Array.isArray(errors) && errors.length > 0) {
      setError(field as keyof FormDataType, {
        type: "manual",
        message: errors.join(", "),
      })
    }
  })
}

export function toastQueryParams(
  message: string,
  type: ToastEnum,
): Record<string, string> {
  return {
    toast: btoa(encodeURIComponent(message)),
    toastType: type,
  }
}
