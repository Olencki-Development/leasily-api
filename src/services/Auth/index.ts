import {
  AuthOptions,
  RegisterForm,
  LoginForm,
  VerifyForm,
  VerifyResult,
  ValidateForm,
  TokenMapping
} from './types'
import container from '../../container'
import { IUser, IUserModel } from '../../models/User'
import UnauthorizedError from '../../errors/Unauthorized'
import Verify from '../Verify'
import * as jwt from 'jsonwebtoken'
import ForbiddenError from '../../errors/ForbiddenError'

export default class Auth {
  private _tokens: TokenMapping = {}

  constructor(private _options: AuthOptions) {}

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

  async verify(form: VerifyForm): Promise<VerifyResult> {
    const User = container.make('models').User as IUserModel

    const user = await User.findOne({
      email: form.email
    }).exec()
    if (!user) {
      throw new UnauthorizedError()
    }

    // const verify = container.make<Verify>(Verify)
    // verify.validateEmail({
    //   user,
    //   code: form.code
    // })

    const token = this._getToken(user)
    this._tokens[token] = user.id

    return {
      user,
      token
    }
  }

  async validate(form: ValidateForm): Promise<IUser> {
    const userId = this._tokens[form.token]
    if (!userId) {
      throw new ForbiddenError()
    }

    const User = container.make('models').User as IUserModel

    const user = await User.findOne({
      _id: userId
    }).exec()

    if (!user) {
      throw new ForbiddenError()
    }

    return user
  }

  private _getToken(user: IUser) {
    // return jwt.sign(
    //   {
    //     id: user.id,
    //     role: 'user'
    //   },
    //   this._options.secret
    // )
    return '1234'
  }
}
