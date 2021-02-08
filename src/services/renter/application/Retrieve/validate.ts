import { ByIdForm } from './types'
import validate, { validator } from '../../../validation'

export function byId(form: Omit<ByIdForm, 'user'>) {
  const values = validate(
    validator.object({
      applicantId: validator.string().trim().token().required()
    }),
    form
  )

  return values
}
