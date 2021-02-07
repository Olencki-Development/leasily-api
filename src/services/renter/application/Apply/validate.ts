import { CompleteForm } from './types'
import validate, { validator } from '../../../validation'

export function complete(form: Omit<CompleteForm, 'user'>) {
  const values = validate(
    validator.object({
      applicationId: validator.string().trim().token().required(),
      history: validator
        .object({
          ssn: validator.string().trim().required(),
          dob: validator.date().iso().max('now').required(),
          pets: validator
            .array()
            .items(
              validator.object({
                type: validator.string().trim().required(),
                breed: validator.string().trim().required(),
                name: validator.string().trim().required()
              })
            )
            .required(),
          emergencyContacts: validator
            .array()
            .items(validator.string().trim().required())
            .min(2)
            .required(),
          isSmoker: validator.boolean().required(),
          residences: validator
            .object({
              current: validator
                .object({
                  address: validator.address.required(),
                  start: validator.date().iso().max('now').required(),
                  reasonForLeaving: validator.string().trim().required(),
                  amount: validator.number().min(1).required(),
                  reference: validator
                    .object({
                      name: validator.string().trim().required(),
                      phone: validator
                        .string()
                        .trim()
                        .phoneNumber({
                          defaultCountry: 'US',
                          format: 'national'
                        })
                        .required()
                    })
                    .required()
                })
                .required(),
              previous: validator
                .object({
                  address: validator.address.required(),
                  start: validator.date().iso().max('now').required(),
                  end: validator.date().iso().max('now').required(),
                  reasonForLeaving: validator.string().trim().required(),
                  amount: validator.number().min(1).required(),
                  reference: validator
                    .object({
                      name: validator.string().trim().required(),
                      phone: validator
                        .string()
                        .trim()
                        .phoneNumber({
                          defaultCountry: 'US',
                          format: 'national'
                        })
                        .required()
                    })
                    .required()
                })
                .required()
            })
            .required(),
          credit: validator
            .object({
              hasDeclaredBankruptcy: validator.boolean().required(),
              hasPreviousEviction: validator.boolean().required(),
              hasLatePayments: validator.boolean().required(),
              hasRefusedToPayRent: validator.boolean().required(),
              reasonForRefusalOfRent: validator.string().valid(null).required()
            })
            .required(),
          employment: validator
            .object({
              status: validator
                .string()
                .trim()
                .valid('Full Time', 'Part Time', 'Student', 'Unemployed')
                .required(),
              employer: validator.string().trim().valid(null).required(),
              start: validator.date().iso().max('now').valid(null).required(),
              position: validator.string().trim().valid(null).required(),
              supervisor: validator
                .object({
                  name: validator.string().trim().valid(null).required(),
                  phone: validator.string().trim().valid(null).required()
                })
                .required(),
              salary: validator
                .object({
                  amount: validator.number().min(1).valid(null).required(),
                  interval: validator
                    .string()
                    .trim()
                    .valid(null, 'weekly', 'bi-weekly', 'monthly', 'yearly')
                    .required()
                })
                .required(),
              additionalIncome: validator
                .object({
                  amount: validator.number().min(1).valid(null).required(),
                  interval: validator
                    .string()
                    .trim()
                    .valid(null, 'weekly', 'bi-weekly', 'monthly', 'yearly')
                    .required()
                })
                .required()
            })
            .required()
        })
        .required()
    }),
    form
  )

  return values
}
