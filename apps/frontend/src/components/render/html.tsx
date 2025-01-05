import { escapeHTML } from "@frontend/lib/utils"

export default function HTML({ children }: { children: string }) {
  const safeHtmlContent = escapeHTML(children)
  return <span dangerouslySetInnerHTML={{ __html: safeHtmlContent }} />
}
