import container from '../../../../container'
import Auth from '../../../../services/Auth'
import { RegisterForm } from '../../../../services/Auth/types'

export default async function register(_: any, args: { form: RegisterForm }) {
  const auth = container.make<Auth>(Auth)

  const user = await auth.register(args.form)

  return user.toJSON()
}
