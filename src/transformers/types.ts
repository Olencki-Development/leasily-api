import { APPLICATION_STAGES } from '../models/Application'
import { TimeInterval, EmploymentInterval } from '../models/Applicant/History'

export type ResultMessageJson = {
  result: string
}

type ModelJson = {
  id: string

  createdAt: string
  updatedAt: string
}

export type UserJson = ModelJson & {
  fullName: string
  email: string
  phone: string
}

export type AddressJson = {
  street: string
  city: string
  state: string
  zipcode: string
}

export type PropertyJson = {
  address: AddressJson
  unit: string | null
}

export type PetJson = {
  type: string
  breed: string
  name: string
}

export type HistoryJson = {
  ssn: string
  dob: string
  pets: PetJson[]
  emergencyContacts: string[]
  isSmoker: boolean
  residences: {
    current: {
      address: AddressJson
      start: string
      reasonForLeaving: string
      amount: number
      reference: {
        name: string
        phone: string
      }
    }
    previous: {
      address: AddressJson
      start: string
      end: string
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
    status: EmploymentInterval
    employer: string | null
    start: string | null
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

export type ApplicantJson = {
  id: string
  user: UserJson
  history: HistoryJson | null
  createdAt: string
  updatedAt: string
}

export type LeaseJson = {
  securityDeposit: {
    amount: number
    hasBeenCollected: boolean
  }
  rent: {
    amount: number
  }
  isMonthToMonth: boolean
  lengthInMonths: number
  startDate: string
}

export type ApplicationJson = ModelJson & {
  property: PropertyJson
  applicants: ApplicantJson[]
  stage: APPLICATION_STAGES
  isClosed: boolean
  lease: LeaseJson
}
