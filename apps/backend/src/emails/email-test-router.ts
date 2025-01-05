import { localeFromReq } from "@backend/lib/utils"
import type { Request, Response } from "express"
import EmailTemplateService from "@backend/services/email/email-template-service"

export default async function emailTestRouter(req: Request, res: Response) {
  const methodName = req.path.split(
    "/email/",
  )[1] as keyof typeof EmailTemplateService

  // Validate that the method exists on EmailTemplateService and is a function
  if (typeof EmailTemplateService[methodName] === "function") {
    let locale = localeFromReq(req)

    // Extract all query parameters except 'type' and construct the data object
    const { type, ...data } = req.query

    const method = EmailTemplateService[methodName] as (
      locale: string,
      data: Record<string, unknown>,
    ) => Promise<{ text: string; html: string }>

    const { text, html } = await method(locale, data)

    const responseType = (type as string) || "html" // Default to 'html' if no type is provided

    if (responseType === "text") {
      res.contentType("text/plain")
      res.send(text)
    } else {
      res.contentType("text/html")
      res.send(html)
    }
  } else {
    res
      .status(404)
      .send(`EmailTemplateService method "${methodName}" not found.`)
  }
}
