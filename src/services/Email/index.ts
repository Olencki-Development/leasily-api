import { SendForm } from './types'
import { MailService } from '@sendgrid/mail'

export default class Email {
  private _fromEmail: string

  constructor(private _client: MailService) {
    const email = process.env.SUPPORT_EMAIL
    if (!email) {
      throw new Error('SUPPORT_EMAIL not set')
    }

    this._fromEmail = email
  }

  async send(form: SendForm) {
    this._client
    return this._client.send({
      to: form.email,
      from: this._fromEmail,
      text: form.body,
      attachments: form.attachments
    })
  }
}
