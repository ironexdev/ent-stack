import { cn } from "@frontend/lib/utils"
import { forwardRef, InputHTMLAttributes } from "react"

export type InputPropsType = {} & InputHTMLAttributes<HTMLInputElement>

const MyInput = forwardRef<HTMLInputElement, InputPropsType>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          type !== "hidden" &&
            "w-full rounded border-[1px] border-none bg-input px-3 text-center text-primary placeholder-primary outline-none focus:ring-2 focus:ring-primary disabled:opacity-20",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)

MyInput.displayName = "Input"

export default MyInput
