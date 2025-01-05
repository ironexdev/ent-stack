import React, { forwardRef, cloneElement, isValidElement, JSX } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@frontend/lib/utils"

type ButtonPropsType = {
  asChild?: boolean
  isActive?: boolean
  activeClassName?: string
  children?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

const MyButton = forwardRef<HTMLButtonElement, ButtonPropsType>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isActive,
      activeClassName,
      children,
      ...props
    },
    ref,
  ) => {
    const combinedClassName = cn(
      buttonVariants({ variant, size, className }),
      isActive && activeClassName,
    )

    // If using asChild, clone the child element and inject props
    if (asChild && isValidElement(children)) {
      const childElement = children as React.ReactElement<
        JSX.IntrinsicElements["button"]
      >

      return cloneElement<JSX.IntrinsicElements["button"]>(childElement, {
        ref,
        className: cn(childElement.props.className, combinedClassName),
        ...props,
      })
    }

    // Otherwise, render a normal button.
    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    )
  },
)

MyButton.displayName = "MyButton"

export default MyButton

const buttonVariants = cva(
  "flex items-center justify-center select-none font-medium disabled:pointer-events-none disabled:opacity-50 outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-button transition-all duration-xs hover:shadow-button rounded-full text-shadow transition-colors button-animation",
        secondary: "bg-button-secondary rounded-full",
        icon: "transition-background-color duration-xs bg-button-primary hover:bg-button-secondary rounded-full",
        menu: "justify-start transition-background-color duration-xs bg-button-primary hover:bg-button-secondary rounded-full",
        blank: "",
      },
      size: {
        default: "h-[40px] min-w-[160px] px-5",
        icon: "size-[40px]",
        menu: "w-full px-2 py-2.5 desktop-w-md:px-5",
        blank: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)
