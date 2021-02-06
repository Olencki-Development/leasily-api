import { RegisterForm, LoginForm, VerifyForm } from './types'
import container from '../../container'
import { IUser, IUserModel } from '../../models/User'
import UnauthorizedError from '../../errors/Unauthorized'
import Verify from '../Verify'
import validate, { validator } from '../validation'

export default class Auth {
  async register(form: RegisterForm): Promise<IUser> {
    const values = validate(
      validator.object({
        fullName: validator.string().trim().required(),
        email: validator.string().email().trim().required(),
        phone: validator
          .string()
          .trim()
          .phoneNumber({ defaultCountry: 'US', format: 'national' })
          .required()
      }),
      form
    )

    const User = container.make('models').User as IUserModel

    const user = await User.create(values)

    const verify = container.make<Verify>(Verify)
    await verify.requestEmail({
      user
    })

    return user
  }

  async login(form: LoginForm): Promise<IUser> {
    const values = validate(
      validator.object({
        email: validator.string().email().trim().required()
      }),
      form
    )

    const User = container.make('models').User as IUserModel

    const user = await User.findOne({
      email: values.email
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
    const values = validate(
      validator.object({
        email: validator.string().email().trim().required(),
        code: validator.string().trim().length(6).required()
      }),
      form
    )
    const User = container.make('models').User as IUserModel

    const user = await User.findOne({
      email: values.email
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
