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
        month: string
        year: string
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
