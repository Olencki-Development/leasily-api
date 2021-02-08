import { ContainerInterface } from '@halliganjs/service-container'
import * as sgMail from '@sendgrid/mail'
import Email from '../services/Email'

export default function (container: ContainerInterface) {
  container.instance('@sendgrid/mail', sgMail)

  container.singleton(Email, function () {
    const email = process.env.SUPPORT_EMAIL
    if (!email) {
      throw new Error('SUPPORT_EMAIL not set')
    }
    const apiKey = process.env.SENDGRID_API_KEY
    if (!apiKey) {
      throw new Error('SENDGRID_API_KEY not set')
    }

    const mail = container.make<typeof sgMail>('@sendgrid/mail')
    mail.setApiKey(apiKey)
    return new Email(mail, email)
  })
}
