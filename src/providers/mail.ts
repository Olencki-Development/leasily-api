import { ContainerInterface } from '@halliganjs/service-container'
import sgMail from '@sendgrid/mail'
import Email from '../services/Email'

export default function (container: ContainerInterface) {
  container.instance('@sendgrid/mail', sgMail)

  container.singleton(Email, function () {
    const email = process.env.SUPPORT_EMAIL
    if (!email) {
      throw new Error('SUPPORT_EMAIL not set')
    }

    const sgMail = container.make('@sendgrid/mail')
    return new Email(sgMail, email)
  })
}
