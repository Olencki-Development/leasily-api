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

export const validator = customJoi

export default function validate<T>(schema: Joi.AnySchema, payload: T): T {
  const result = schema.validate(payload)
  if (result.error) {
    throw result.error
  }

  return result.value
}
