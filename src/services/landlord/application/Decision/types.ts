import { IUser } from '../../../../models/User'

export type ApproveForm = {
  applicationId: string
  user: IUser
}

export type DeclineForm = {
  applicationId: string
  user: IUser
}
