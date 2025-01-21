import TemplateService, {
  type CompiledTemplateResultType,
} from "@backend/services/template-service"
import {
  t_emailGoodbye,
  t_emailGreeting,
  t_emailLoginAttemptSubject,
  t_emailLoginAttemptTextSentence1,
  t_emailLoginAttemptTextSentence2,
  t_emailLoginAttemptTextSentence3,
  t_emailLoginSubject,
  t_emailLoginTextSentence1,
  t_emailLoginTextSentence2,
  t_emailRegistrationAttemptSubject,
  t_emailRegistrationAttemptTextSentence1,
  t_emailRegistrationAttemptTextSentence2,
  t_emailRegistrationSubject,
  t_emailRegistrationTextSentence1,
  t_emailRegistrationTextSentence2,
} from "@shared/i18n/messages/t-emails"
import BackendConfig from "@backend/config/backend-config"
import type { LocaleType } from "@shared/i18n/t"
import { env } from "@backend/env"

export default class EmailTemplateService {
  static async getLoginAttemptTemplate(
    locale: LocaleType,
    registrationLink: string,
  ): Promise<CompiledTemplateResultType> {
    return await TemplateService.compileTemplate(
      "login-attempt-email.hbs",
      BackendConfig.emailTemplatesDirectory,
      {
        siteName: env.SITE_NAME,
        subject: t_emailLoginAttemptSubject(locale),
        greeting: t_emailGreeting(locale),
        sentence1: t_emailLoginAttemptTextSentence1(locale),
        sentence2: t_emailLoginAttemptTextSentence2(locale, registrationLink),
        sentence3: t_emailLoginAttemptTextSentence3(locale, env.SECURITY_EMAIL),
        goodbye: t_emailGoodbye(locale),
      },
      locale,
    )
  }

  static async getRegistrationAttemptTemplate(
    locale: LocaleType,
    loginLink: string,
  ): Promise<CompiledTemplateResultType> {
    return await TemplateService.compileTemplate(
      "registration-attempt-email.hbs",
      BackendConfig.emailTemplatesDirectory,
      {
        siteName: env.SITE_NAME,
        subject: t_emailRegistrationAttemptSubject(locale),
        greeting: t_emailGreeting(locale),
        sentence1: t_emailRegistrationAttemptTextSentence1(locale),
        sentence2: t_emailRegistrationAttemptTextSentence2(locale, loginLink),
        sentence3: t_emailLoginAttemptTextSentence3(locale, env.SECURITY_EMAIL),
        goodbye: t_emailGoodbye(locale),
      },
      locale,
    )
  }

  static async getLoginTemplate(
    locale: LocaleType,
    data: {
      pin: string
    },
  ): Promise<CompiledTemplateResultType> {
    return await TemplateService.compileTemplate(
      "login-email.hbs",
      BackendConfig.emailTemplatesDirectory,
      {
        siteName: env.SITE_NAME,
        subject: t_emailLoginSubject(locale),
        greeting: t_emailGreeting(locale),
        sentence1: t_emailLoginTextSentence1(locale, data.pin),
        sentence2: t_emailLoginTextSentence2(locale, env.SECURITY_EMAIL),
        goodbye: t_emailGoodbye(locale),
      },
      locale,
    )
  }

  static async getRegistrationTemplate(
    locale: LocaleType,
    data: {
      pin: string
    },
  ): Promise<CompiledTemplateResultType> {
    return await TemplateService.compileTemplate(
      "registration-email.hbs",
      BackendConfig.emailTemplatesDirectory,
      {
        siteName: env.SITE_NAME,
        subject: t_emailRegistrationSubject(locale),
        greeting: t_emailGreeting(locale),
        sentence1: t_emailRegistrationTextSentence1(locale, data.pin),
        sentence2: t_emailRegistrationTextSentence2(locale, env.SECURITY_EMAIL),
        goodbye: t_emailGoodbye(locale),
      },
      locale,
    )
  }
}
