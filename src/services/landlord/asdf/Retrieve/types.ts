import { IApplicant } from '../../../../models/Applicant'
import { IApplication } from '../../../../models/Application'
import { IUser } from '../../../../models/User'
import { ILandlord } from '../../../../models/Landlord'

export type AllForm = {
  user: IUser
}

export type ByIdForm = {
  user: IUser
  applicationId: string
}

export type RetrieveReturnType = {
  applicants: IApplicant[]
  application: IApplication
  landlord: ILandlord
}
