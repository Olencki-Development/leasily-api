import { SendForm } from './types'
import { MailService } from '@sendgrid/mail'

export default class Email {
  constructor(private _client: MailService, private _fromEmail: string) {}

  async send(form: SendForm) {
    return this._client.send({
      to: form.email,
      from: this._fromEmail,
      text: form.body,
      attachments: form.attachments
    })
  }
}
