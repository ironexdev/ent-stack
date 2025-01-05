import FileSystemService from "@backend/services/file-system-service"
import type { LocaleType } from "@shared/i18n/t"
import Handlebars from "handlebars"
import { convert } from "html-to-text"

export type CompiledTemplateResultType = {
  text: string
  html: string
}

export default class TemplateService {
  // Throws an error if the file does not exist or if the template is invalid
  static async compileTemplate(
    path: string,
    templateDirectory: string,
    context: object,
    locale: LocaleType,
  ): Promise<CompiledTemplateResultType> {
    const source = await FileSystemService.readFile(
      `${templateDirectory}/${path}`,
    )

    const template = Handlebars.compile(source)

    const html = template({ ...context, locale })

    const text = Handlebars.compile(convert(html))({
      ...context,
      locale,
    })

    return { text, html }
  }
}
