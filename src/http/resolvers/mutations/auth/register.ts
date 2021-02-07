import container from '../../../../container'
import Auth from '../../../../services/Auth'
import { RegisterForm } from '../../../../services/Auth/types'
import { register as validate } from '../../../../services/Auth/validate'
import result from '../../../../transformers/result'

export default async function register(_: any, args: { form: RegisterForm }) {
  const form = validate(args.form)
  const auth = container.make<Auth>(Auth)

  await auth.register(form)

  return result('Validation code sent')
}
