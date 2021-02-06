import { RegisterForm, LoginForm, VerifyForm } from './types'
import validate, { validator } from '../validation'

export function register(form: RegisterForm) {
  const values = validate(
    validator.object({
      fullName: validator.string().trim().required(),
      email: validator.string().email().trim().required(),
      phone: validator
        .string()
        .trim()
        .phoneNumber({ defaultCountry: 'US', format: 'national' })
        .required()
    }),
    form
  )
  return values
}

export function login(form: LoginForm) {
  const values = validate(
    validator.object({
      email: validator.string().email().trim().required()
    }),
    form
  )
  return values
}

export function verify(form: VerifyForm) {
  const values = validate(
    validator.object({
      email: validator.string().email().trim().required(),
      code: validator.string().trim().length(6).required()
    }),
    form
  )
  return values
}
