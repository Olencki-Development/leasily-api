import { ITransformer } from '../types'
import validator from '../../services/validation'
import { CreditCardType } from '../../services/RentPrep/types'
import { IApplication } from '../../models/Application'

type Payload = {
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

type Entities = {
  application: IApplication
}

type Json = {}

export default class BackgroundCheckTransformer
  implements ITransformer<Payload, Entities, Json> {
  in(payload: Payload): Payload {
    const schema = validator.object({
      applicationId: validator.string().trim().token().required(),
      customer: validator
        .object({
          creditCard: validator
            .object({
              number: validator.string().trim().creditCard().required(),
              security: validator.string().min(3).max(4).required(),
              type: validator
                .string()
                .valid('visa', 'amex', 'mastercard', 'discover')
                .required(),
              expiration: validator
                .object({
                  month: validator.number().positive().max(12).required(),
                  year: validator
                    .number()
                    .min(new Date().getFullYear())
                    .required()
                })
                .required()
            })
            .required(),
          billingAddress: validator
            .object({
              street: validator.string().trim().required(),
              city: validator.string().trim().required(),
              state: validator.string().trim().length(2).required(),
              zipcode: validator.string().trim().length(5).required()
            })
            .required(),
          ipAddress: validator
            .string()
            .ip({
              version: ['ipv4']
            })
            .required()
        })
        .required()
    })

    const result = schema.validate(payload)
    if (result.error) {
      throw result.error
    }

    return result.value
  }

  out(): Json {
    return {}
  }
}
