export enum LocaleEnum {
  EN = "en",
  CS = "cs",
}

export const localeEnumAsArray = Object.values(LocaleEnum) as LocaleEnum[]

export const localeEnumAsLanguages = {
  [LocaleEnum.EN]: "English",
  [LocaleEnum.CS]: "Čeština",
}
