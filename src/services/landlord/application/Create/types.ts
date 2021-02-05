import { IApplicant } from '../../../../models/Applicant'
import { IApplication } from '../../../../models/Application'
import { IUser } from '../../../../models/User'
import { ILandlord } from '../../../../models/Landlord'

export type CreateForm = {
  property: {
    address: {
      street: string
      city: string
      state: string
      zipcode: string
    }
    unit: string | null
  }
  lease: {
    securityDeposit: {
      amount: number
    }
    rent: {
      amount: number
    }
    lengthInMonths: number
    startDate: Date
  }
  applicants: ApplicantForm[]
  user: IUser
  waitPeriodInDays: number
  fee: number
}

export type ApplicantForm = {
  fullName: string
  email: string
  phone: string
}

export type CreateReturnType = {
  applicants: IApplicant[]
  application: IApplication
  landlord: ILandlord
}
