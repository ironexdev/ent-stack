import MyInput from "@frontend/components/user-input/my-input"
import { cn } from "@frontend/lib/utils"
import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form"

export default function FormInputField<TFieldValues extends FieldValues>({
  name,
  register,
  label,
  placeholder,
  type,
  error,
  className,
  inputClassName,
  disabled,
}: {
  name: Path<TFieldValues>
  register: UseFormRegister<TFieldValues>
  label: string
  placeholder: string
  type: string
  error?: FieldError
  className?: string
  inputClassName?: string
  disabled?: boolean
}) {
  return (
    <div className={cn("w-full", className)}>
      <label className="block">
        <span className="text-xs text-secondary">{label}</span>
        <MyInput
          className={cn(
            "mt-2 h-[44px]",
            inputClassName,
            error ? "text-error placeholder-error" : "",
          )}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          disabled={disabled}
        />
      </label>
      {error && <div className="mt-2 text-sm text-error">{error.message}</div>}
    </div>
  )
}
