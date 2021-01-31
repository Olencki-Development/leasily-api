import { RegisterForm, LoginForm, VerifyForm } from './types'
import container from '../../container'
import { IUser, IUserModel } from '../../models/User'
import Unauthorized from '../../errors/Unauthorized'

class Auth {
  async register(form: RegisterForm): Promise<IUser> {
    const User = container.make('models').User as IUserModel

    return User.create(form)
  }

  async login(form: LoginForm): Promise<IUser> {
    const User = container.make('models').User as IUserModel

    const user = await User.findOne({
      email: form.email
    })
    if (!user) {
      throw new Unauthorized()
    }

    return user
  }

  async verify(form: VerifyForm): Promise<IUser> {
    const User = container.make('models').User as IUserModel

    const user = await User.findOne({
      email: form.email
    })
    if (!user) {
      throw new Unauthorized()
    }

    return user
  }
}
