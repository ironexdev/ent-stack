import type { LocaleType } from "@shared/i18n/t"
import {
  t_emailLoginAttemptSubject,
  t_emailLoginSubject,
  t_emailRegistrationAttemptSubject,
  t_emailRegistrationSubject,
} from "@shared/i18n/messages/t-emails"
import { mailer } from "@backend/index"
import { type CompiledTemplateResultType } from "@backend/services/template-service"
import EmailTemplateService from "@backend/services/email/email-template-service"
import EmailNotSentError from "@backend/errors/email-not-sent-error"
import { env } from "@backend/env"

export default class EmailService {
  private static async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    const from = `${env.SITE_NAME} <${env.SERVICE_EMAIL}>`

    const { error } = await mailer.emails.send({
      from,
      to,
      subject,
      text,
      html,
    })

    if (error) {
      throw new EmailNotSentError(
        `Failed to send login attempt email to ${to}`,
        error.name,
        error.message,
      )
    }
  }

  static async sendLoginAttemptEmail(
    to: string,
    locale: LocaleType,
    registrationLink: string,
  ): Promise<CompiledTemplateResultType> {
    const subject = t_emailLoginAttemptSubject(locale)

    const template = await EmailTemplateService.getLoginAttemptTemplate(
      locale,
      registrationLink,
    )

    const { text, html } = template
    await this.sendEmail(to, subject, text, html)

    return { text, html }
  }

  static async sendRegistrationAttemptEmail(
    to: string,
    locale: LocaleType,
    loginLink: string,
  ): Promise<CompiledTemplateResultType> {
    const subject = t_emailRegistrationAttemptSubject(locale)

    const template = await EmailTemplateService.getRegistrationAttemptTemplate(
      locale,
      loginLink,
    )

    const { text, html } = template

    await this.sendEmail(to, subject, text, html)

    return { text, html }
  }

  static async sendLoginEmail(
    to: string,
    locale: LocaleType,
    pin: string,
  ): Promise<CompiledTemplateResultType> {
    const subject = t_emailLoginSubject(locale)

    const template = await EmailTemplateService.getLoginTemplate(locale, {
      pin,
    })

    const { text, html } = template

    await this.sendEmail(to, subject, text, html)

    return { text, html }
  }

  static async sendRegistrationEmail(
    to: string,
    locale: LocaleType,
    pin: string,
  ): Promise<CompiledTemplateResultType> {
    const subject = t_emailRegistrationSubject(locale)

    const template = await EmailTemplateService.getRegistrationTemplate(
      locale,
      { pin },
    )

    const { text, html } = template

    await this.sendEmail(to, subject, text, html)

    return { text, html }
  }
}
