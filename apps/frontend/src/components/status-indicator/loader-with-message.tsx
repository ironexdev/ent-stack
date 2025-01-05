import { cn } from "@frontend/lib/utils"

export default function LoaderWithMessage({
  message,
  className,
}: {
  message: string
  className?: string
}) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {message}
    </div>
  )
}
