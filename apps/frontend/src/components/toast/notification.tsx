import { X } from "lucide-react"
import { toast } from "sonner"
import { ReactNode, useEffect, useRef } from "react"
import { cn } from "@frontend/lib/utils"

export default function Notification({
  id,
  message,
  duration,
  icon,
  className,
  label,
}: {
  id: number | string
  message: string | ReactNode
  duration: number
  icon: ReactNode
  className: string
  label: string
}) {
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (loaderRef.current && duration) {
      loaderRef.current.style.width = "100%"
      loaderRef.current.getBoundingClientRect()
      loaderRef.current.style.width = "0%"
    }
  }, [duration])

  return (
    <div
      className={cn(
        "relative min-w-[240px] max-w-[360px] rounded-md px-3 py-3 pl-3 shadow-toast text-shadow",
        className,
      )}
    >
      <div className="flex w-full opacity-50">
        {icon}
        <div className="ml-1.5 text-sm">{label}</div>
        <X
          onClick={() => toast.dismiss(id)}
          size={20}
          className="ml-auto cursor-pointer"
        />
      </div>
      <div className="mt-1.5 text-base">{message}</div>
      {duration && (
        <div
          ref={loaderRef}
          className={`bg-toast-loader absolute bottom-0 left-0 h-[5px] w-full rounded-md`}
          style={{ transition: `width linear ${duration}ms` }}
        ></div>
      )}
    </div>
  )
}
