import { IUser } from '../../models/User'

export type RequestEmailForm = {
  user: IUser
}

export type ValidateEmailForm = {
  user: IUser
  code: string
}
