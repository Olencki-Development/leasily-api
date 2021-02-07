import container from '../../../../container'
import Auth from '../../../../services/Auth'
import { LoginForm } from '../../../../services/Auth/types'
import { login as validate } from '../../../../services/Auth/validate'
import result from '../../../../transformers/result'

export default async function login(_: any, args: { form: LoginForm }) {
  const form = validate(args.form)
  const auth = container.make<Auth>(Auth)

  await auth.login(form)

  return result('Validation code sent')
}
