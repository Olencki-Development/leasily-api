import { TimeInterval } from '../../../../models/Applicant/History'
import { IUser } from '../../../../models/User'

export type CompleteForm = {
  user: IUser
  applicantId: string
  history: {
    ssn: string
    dob: Date
    pets: {
      type: string
      breed: string
      name: string
    }[]
    emergencyContacts: string[]
    isSmoker: boolean
    residences: {
      current: {
        address: {
          street: string
          city: string
          state: string
          zipcode: string
        }
        start: Date
        reasonForLeaving: string
        amount: number
        reference: {
          name: string
          phone: string
        }
      }
      previous: {
        address: {
          street: string
          city: string
          state: string
          zipcode: string
        }
        start: Date
        end: Date
        reasonForLeaving: string
        amount: number
        reference: {
          name: string
          phone: string
        }
      }
    }
    credit: {
      hasDeclaredBankruptcy: boolean
      hasPreviousEviction: boolean
      hasLatePayments: boolean
      hasRefusedToPayRent: boolean
      reasonForRefusalOfRent: string | null
    }
    employment: {
      status: 'Full Time' | 'Part Time' | 'Student' | 'Umemployed'
      employer: string | null
      start: Date | null
      position: string | null
      supervisor: {
        name: string | null
        phone: string | null
      }
      salary: {
        amount: number | null
        interval: TimeInterval | null
      }
      additionalIncome: {
        amount: number | null
        interval: TimeInterval | null
      }
    }
  }
}
