import { RequestForm } from './types'
import validate, { validator } from '../../validation'

export function request(form: Omit<RequestForm, 'user'>) {
  const values = validate(
    validator.object({
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
          billingAddress: validator.address.required(),
          ipAddress: validator
            .string()
            .ip({
              version: ['ipv4']
            })
            .required()
        })
        .required()
    }),
    form
  )
  return values
}
