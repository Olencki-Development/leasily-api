import { IUser } from '../../models/User'

export type RequestEmailForm = {
  user: IUser
}

export type ValidateEmailForm = {
  user: IUser
  code: string
}

export type VerificationPayload = {
  dateTime: Date
  code: string
}

export type VerificationMatch = {
  [id: string]: VerificationPayload
}
