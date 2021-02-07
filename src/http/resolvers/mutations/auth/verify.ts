import container from '../../../../container'
import Auth from '../../../../services/Auth'
import { VerifyForm } from '../../../../services/Auth/types'
import { verify as validate } from '../../../../services/Auth/validate'
import userToJson from '../../../../transformers/user'

export default async function verify(_: any, args: { form: VerifyForm }) {
  const form = validate(args.form)
  const auth = container.make<Auth>(Auth)

  const { user, token } = await auth.verify(form)

  return {
    user: userToJson({
      user
    }),
    token
  }
}
