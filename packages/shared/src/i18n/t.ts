import { IntlMessageFormat } from "intl-messageformat"
import { LocaleEnum } from "@shared/enums/locale-enum"

export type LocaleType = (typeof LocaleEnum)[keyof typeof LocaleEnum]

export type MessagesType = {
  [key in LocaleEnum]: string
}

export function t(
  messages: MessagesType,
  lang: LocaleType,
  count = 1,
  variables: Record<string, unknown> = {},
): string {
  const finalVariables = {
    ...variables,
    count,
  }

  const msg = new IntlMessageFormat(messages[lang], lang, undefined, {
    ignoreTag: true,
  })

  return msg.format(finalVariables) as string
}
