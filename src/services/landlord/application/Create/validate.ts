import { CreateForm } from './types'
import validate, { validator } from '../../../validation'

type ValdidateCreateType = Omit<CreateForm, 'user' | 'lease'> & {
  lease: {
    securityDeposit: {
      amount: number
    }
    rent: {
      amount: number
    }
    lengthInMonths: number
    startDate: string
  }
}

export function create(form: ValdidateCreateType): Omit<CreateForm, 'user'> {
  const values = validate(
    validator.object({
      property: validator
        .object({
          address: validator.address.required(),
          unit: validator.string().allow(null).trim().required()
        })
        .required(),
      lease: validator
        .object({
          securityDeposit: validator
            .object({
              amount: validator.number().min(1).required()
            })
            .required(),
          rent: validator
            .object({
              amount: validator.number().min(1).required()
            })
            .required(),
          lengthInMonths: validator.number().min(1).required(),
          startDate: validator.date().iso().min('now').required()
        })
        .required(),
      applicants: validator
        .array()
        .items(
          validator
            .object({
              fullName: validator.string().trim().required(),
              email: validator.string().email().trim().required(),
              phone: validator
                .string()
                .trim()
                .phoneNumber({ defaultCountry: 'US', format: 'national' })
                .required()
            })
            .required()
        )
        .min(1)
        .required(),
      waitPeriodInDays: validator.number().min(1).required(),
      fee: validator.number().min(0).required()
    }),
    form
  )
  return (values as any) as Omit<CreateForm, 'user'>
}
