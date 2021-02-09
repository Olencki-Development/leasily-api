import * as Joi from 'joi'
import * as joiPhone from 'joi-phone-number'

const customJoi = Joi.extend(joiPhone as any)

const address = customJoi.object({
  street: customJoi.string().trim().required(),
  city: customJoi.string().trim().required(),
  state: customJoi.string().trim().length(2).required(),
  zipcode: customJoi.string().trim().length(5).required()
})

customJoi.address = address

const ssn = customJoi
  .string()
  .trim()
  .custom((value: string, helpers: Joi.CustomHelpers) => {
    const numbersOnlyValue = value.split('-').join('')
    if (numbersOnlyValue.length !== 9) {
      return helpers.error('any.invalid')
    }

    const ssn =
      numbersOnlyValue.slice(0, 3) +
      '-' +
      numbersOnlyValue.slice(3, 5) +
      '-' +
      numbersOnlyValue.slice(5, 9)
    const isSsn = /^(?!(000|666|9))\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/.test(ssn)
    if (!isSsn) {
      return helpers.error('any.invalid')
    }

    return ssn
  }, 'SSN validation')

customJoi.ssn = ssn

export const validator = customJoi

export default function validate<T>(schema: Joi.AnySchema, payload: T): T {
  const result = schema.validate(payload)
  if (result.error) {
    throw result.error
  }

  return result.value
}
