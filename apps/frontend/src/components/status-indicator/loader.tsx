import { cn } from "@frontend/lib/utils"
import { Ellipsis } from "lucide-react"

export default function Loader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Ellipsis size={20} className="animate-ping" />
    </div>
  )
}
