import { ITransformer, ApplicationJson } from '../../types'
import validator from '../../../services/validation'
import { IApplicant } from '../../../models/Applicant'
import { IApplication } from '../../../models/Application'
import { ILandlord } from '../../../models/Landlord'
import { IUser } from '../../../models/User'

type Payload = {
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
    startDate: string
  }
  applicants: {
    fullName: string
    email: string
    phone: string
  }[]
  waitPeriodInDays: number
  fee: number
}

type Entities = {
  applicants: IApplicant[]
  application: IApplication
  landlord: ILandlord
}[]

type Json = {
  applications: ApplicationJson[]
}

export default class ApplicationCreateTransformer
  implements ITransformer<Payload, Entities, Json> {
  in(payload: Payload): Payload {
    const schema = validator.object({
      property: validator
        .object({
          address: validator.address.required(),
          unit: validator.string().allow(null).trim().required()
        })
        .required(),
      lease: validator
        .object({
          securityDeposit: validator
            .object({
              amount: validator.number().min(1).required()
            })
            .required(),
          rent: validator
            .object({
              amount: validator.number().min(1).required()
            })
            .required(),
          lengthInMonths: validator.number().min(1).required(),
          startDate: validator.date().iso().min('now').required()
        })
        .required(),
      applicants: validator
        .array()
        .items(
          validator
            .object({
              fullName: validator.string().trim().required(),
              email: validator.string().email().trim().required(),
              phone: validator
                .string()
                .trim()
                .phoneNumber({ defaultCountry: 'US', format: 'national' })
                .required()
            })
            .required()
        )
        .min(1)
        .required(),
      waitPeriodInDays: validator.number().min(1).required(),
      fee: validator.number().min(0).required()
    })

    const result = schema.validate(payload)
    if (result.error) {
      throw result.error
    }

    return result.value
  }

  out(entities: Entities): Json {
    const applications: ApplicationJson[] = entities.map((entity) => {
      return {
        id: entity.application.id,
        property: {
          address: {
            street: entity.application.property.address.street,
            city: entity.application.property.address.city,
            state: entity.application.property.address.state,
            zipcode: entity.application.property.address.zipcode
          },
          unit: entity.application.property.unit
        },
        lease: {
          securityDeposit: {
            amount: entity.application.lease.securityDeposit.amount,
            hasBeenCollected:
              entity.application.lease.securityDeposit.hasBeenCollected
          },
          rent: {
            amount: entity.application.lease.rent.amount
          },
          isMonthToMonth: entity.application.lease.isMonthToMonth(),
          lengthInMonths: entity.application.lease.lengthInMonths,
          startDate: entity.application.lease.startDate.toISOString()
        },
        applicants: entity.applicants.map((applicant) => {
          let history = null
          if (applicant.history) {
            history = {
              ssn: applicant.history.ssn,
              dob: applicant.history.dob.toISOString(),
              pets: applicant.history.pets.map((pet) => {
                return {
                  type: pet.type,
                  breed: pet.breed,
                  name: pet.name
                }
              }),
              emergencyContacts: applicant.history.emergencyContacts,
              isSmoker: applicant.history.isSmoker,
              residences: {
                current: {
                  address: {
                    street: applicant.history.residences.current.address.street,
                    city: applicant.history.residences.current.address.city,
                    state: applicant.history.residences.current.address.state,
                    zipcode:
                      applicant.history.residences.current.address.zipcode
                  },
                  start: applicant.history.residences.current.start.toISOString(),
                  reasonForLeaving:
                    applicant.history.residences.current.reasonForLeaving,
                  amount: applicant.history.residences.current.amount,
                  reference: {
                    name: applicant.history.residences.current.reference.name,
                    phone: applicant.history.residences.current.reference.phone
                  }
                },
                previous: {
                  address: {
                    street:
                      applicant.history.residences.previous.address.street,
                    city: applicant.history.residences.previous.address.city,
                    state: applicant.history.residences.previous.address.state,
                    zipcode:
                      applicant.history.residences.previous.address.zipcode
                  },
                  start: applicant.history.residences.previous.start.toISOString(),
                  end: applicant.history.residences.previous.end.toISOString(),
                  reasonForLeaving:
                    applicant.history.residences.previous.reasonForLeaving,
                  amount: applicant.history.residences.previous.amount,
                  reference: {
                    name: applicant.history.residences.previous.reference.name,
                    phone: applicant.history.residences.previous.reference.phone
                  }
                }
              },
              credit: {
                hasDeclaredBankruptcy:
                  applicant.history.credit.hasDeclaredBankruptcy,
                hasPreviousEviction:
                  applicant.history.credit.hasPreviousEviction,
                hasLatePayments: applicant.history.credit.hasLatePayments,
                hasRefusedToPayRent:
                  applicant.history.credit.hasRefusedToPayRent,
                reasonForRefusalOfRent:
                  applicant.history.credit.reasonForRefusalOfRent
              },
              employment: {
                status: applicant.history.employment.status,
                employer: applicant.history.employment.employer,
                start: applicant.history.employment.start
                  ? applicant.history.employment.start.toISOString()
                  : null,
                position: applicant.history.employment.position,
                supervisor: {
                  name: applicant.history.employment.supervisor.name,
                  phone: applicant.history.employment.supervisor.phone
                },
                salary: {
                  amount: applicant.history.employment.salary.amount,
                  interval: applicant.history.employment.salary.interval
                },
                additionalIncome: {
                  amount: applicant.history.employment.additionalIncome.amount,
                  interval:
                    applicant.history.employment.additionalIncome.interval
                }
              }
            }
          }
          return {
            user: {
              id: (applicant.user as IUser).id,
              fullName: (applicant.user as IUser).fullName,
              email: (applicant.user as IUser).email,
              phone: (applicant.user as IUser).phone,
              createdAt: (applicant.user as IUser).createdAt.toISOString(),
              updatedAt: (applicant.user as IUser).updatedAt.toISOString()
            },
            history: history
          }
        }),
        stage: entity.application.stage,
        isClosed: entity.application.isClosed,
        createdAt: entity.application.createdAt.toISOString(),
        updatedAt: entity.application.updatedAt.toISOString()
      }
    })
    return {
      applications
    }
  }
}
