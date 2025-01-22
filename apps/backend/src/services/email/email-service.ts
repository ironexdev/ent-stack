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
import MailSlurp from "mailslurp-client"
import { ErrorService } from "@backend/services/error-service"
import { EnvironmentEnum } from "@shared/enums/environment-enum"

export default class EmailService {
  private static async sendTestEmail(
    from: string,
    to: string,
    subject: string,
    text: string,
    html?: string,
  ) {
    const mailslurp = new MailSlurp.default({
      apiKey: env.MAILSLURP_API_KEY,
    })

    return await ErrorService.catchAsyncError(
      mailslurp.sendEmail(env.MAILSLURP_INBOX_ID, {
        from,
        to: [to],
        subject,
        body: html ?? text,
        isHTML: !!html,
      }),
    )
  }

  private static async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    if (env.NODE_ENV === EnvironmentEnum.TEST) {
      // Can be changed to SERVICE_EMAIL even during tests, but the email needs to be verified first (https://app.mailslurp.com/email-validation)
      // Requires paid subscription
      const from = `${env.SITE_NAME} <${env.MAILSLURP_EMAIL}>`
      const [error] = await this.sendTestEmail(from, to, subject, text, html)

      if (error) {
        throw new EmailNotSentError(
          `Failed to send login attempt email to ${to}`,
          error.name,
          error.message,
        )
      }

      return
    }

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
