import * as Joi from 'joi'

export const phone = Joi.string()
  .trim()
  .regex(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    'Invalid phone number'
  )
