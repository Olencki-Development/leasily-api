import container from '../../../../container'
import Auth from '../../../../services/Auth'
import { RegisterForm } from '../../../../services/Auth/types'
import * as Joi from 'joi'

const schema = Joi.object({
  fullName: Joi.string().trim().required(),
  email: Joi.string().email().trim().required()
})

export default async function register(_: any, args: { form: RegisterForm }) {
  const result = schema.validate(args.form)
  if (result.error) {
    throw result.error
  }
  const auth = container.make<Auth>(Auth)

  const user = await auth.register(result.value)

  return user.toJSON()
}
