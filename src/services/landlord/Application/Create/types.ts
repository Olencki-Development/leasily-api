import { IApplicant } from '../../../../models/Applicant'
import { IApplication } from '../../../../models/Application'

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
      hasBeenCollected: boolean
    }
    rent: {
      amount: number
    }
    lengthInMonths: number
    startDate: Date
  }
  applicants: ApplicantForm[]
}

export type ApplicantForm = {
  fullName: string
  email: string
  phone: string
}

export type CreateReturnType = {
  applicants: IApplicant[]
  application: IApplication
}
