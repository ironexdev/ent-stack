import { cn } from "@frontend/lib/utils"
import { LoaderIcon } from "lucide-react"

export default function LoaderCircle({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <LoaderIcon size={20} className="animate-spin" />
    </div>
  )
}
