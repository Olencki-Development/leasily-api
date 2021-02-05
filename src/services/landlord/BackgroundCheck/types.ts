import { CreditCardType } from '../../RentPrep/types'
import { IUser } from '../../../models/User'

export type RequestForm = {
  user: IUser
  applicationId: string
  customer: {
    creditCard: {
      number: string
      security: string
      type: CreditCardType
      expiration: {
        month: number
        year: number
      }
    }
    billingAddress: {
      street: string
      city: string
      state: string
      zipcode: string
    }
    ipAddress: string
  }
}

export type WebhookForm = {
  transactionId: number
  orderId: string
  orderStatus: 'Canceled' | 'Partial' | 'Pending' | 'Ready' | 'Error'
  paymentId?: string
  paymentAmount?: number
  customerReferenceId: string
  referenceId: string
  referenceText?: string
  filename: string
  fileformat: 'pdf'
  file: ArrayBuffer
}
