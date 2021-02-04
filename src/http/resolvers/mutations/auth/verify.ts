import container from '../../../../container'
import Auth from '../../../../services/Auth'
import { VerifyForm } from '../../../../services/Auth/types'
import * as Joi from 'joi'

const schema = Joi.object({
  email: Joi.string().email().trim().required(),
  code: Joi.string().length(6).required()
})

export default async function register(_: any, args: { form: VerifyForm }) {
  const result = schema.validate(args.form)
  if (result.error) {
    throw result.error
  }
  const auth = container.make<Auth>(Auth)

  const user = await auth.verify(result.value)

  return user.toJSON()
}
