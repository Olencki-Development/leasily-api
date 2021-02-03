import { RegisterForm, LoginForm, VerifyForm } from './types'
import container from '../../container'
import { IUser, IUserModel } from '../../models/User'
import UnauthorizedError from '../../errors/Unauthorized'
import Verify from '../Verify'

export default class Auth {
  async register(form: RegisterForm): Promise<IUser> {
    const User = container.make('models').User as IUserModel

    const user = await User.create(form)

    const verify = container.make<Verify>(Verify)
    await verify.requestEmail({
      user
    })

    return user
  }

  async login(form: LoginForm): Promise<IUser> {
    const User = container.make('models').User as IUserModel

    const user = await User.findOne({
      email: form.email
    }).exec()
    if (!user) {
      throw new UnauthorizedError()
    }

    const verify = container.make<Verify>(Verify)
    await verify.requestEmail({
      user
    })

    return user
  }

  async verify(form: VerifyForm): Promise<IUser> {
    const User = container.make('models').User as IUserModel

    const user = await User.findOne({
      email: form.email
    }).exec()
    if (!user) {
      throw new UnauthorizedError()
    }

    const verify = container.make<Verify>(Verify)
    verify.validateEmail({
      user,
      code: form.code
    })

    return user
  }
}
