import { ContainerInterface } from '@halliganjs/service-container'
import sgMail from '@sendgrid/mail'
import Email from '../services/Email'

export default function (container: ContainerInterface) {
  container.instance('@sendgrid/mail', sgMail)

  container.singleton('Email', function () {
    const sgMail = container.make('@sendgrid/mail')
    return new Email(sgMail)
  })
}
