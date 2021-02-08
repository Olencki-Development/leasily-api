import { IUser } from '../../../../models/User'
import { IApplicant } from '../../../../models/Applicant'
import { IApplication } from '../../../../models/Application'

export type ByIdForm = {
  user: IUser
  applicantId: string
}

export type ByIdResult = {
  applicant: IApplicant
  application: IApplication
}
