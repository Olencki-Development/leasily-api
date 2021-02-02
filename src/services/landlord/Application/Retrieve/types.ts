import { IApplicant } from '../../../../models/Applicant'
import { IApplication } from '../../../../models/Application'
import { IUser } from '../../../../models/User'
import { ILandlord } from '../../../../models/Landlord'

export type RetrieveForm = {
  user: IUser
}

export type RetrieveReturnType = {
  applicants: IApplicant[]
  application: IApplication
  landlord: ILandlord
}[]
