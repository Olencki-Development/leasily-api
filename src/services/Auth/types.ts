import { IUser } from '../../models/User'

export type AuthOptions = {
  secret: string
}

export type RegisterForm = {
  fullName: string
  email: string
  phone: string
}

export type LoginForm = {
  email: string
}

export type VerifyForm = {
  email: string
  code: string
}

export type VerifyResult = {
  user: IUser
  token: string
}

export type TokenMapping = {
  [token: string]: string
}

export type ValidateForm = {
  token: string
}
