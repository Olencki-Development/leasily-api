import { ApproveForm, DeclineForm } from './types'
import validate, { validator } from '../../../validation'

export function approve(form: Omit<ApproveForm, 'user'>) {
  const values = validate(
    validator.object({
      applicationId: validator.string().trim().token().required()
    }),
    form
  )
  return values
}

export function decline(form: Omit<DeclineForm, 'user'>) {
  const values = validate(
    validator.object({
      applicationId: validator.string().trim().token().required()
    }),
    form
  )
  return values
}
