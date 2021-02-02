import { RequestForm } from './types'
import container from '../../../container'
import { IUser } from '../../../models/User'
import { IApplicant, IApplicantModel } from '../../../models/Applicant'
import RentPrep from '../../RentPrep'
import {
  IApplication,
  IApplicationModel,
  APPLICATION_STAGES
} from '../../../models/Application'
import ApplicationPendingError from '../../../errors/ApplicationPendingError'
import NotFoundError from '../../../errors/NotFoundError'

export default class BackgroundCheck {
  async request(form: RequestForm) {
    const Application = container.make('models')
      .Application as IApplicationModel
    const application = await Application.findOne({
      id: form.applicationId
    })
    if (!application) {
      throw new NotFoundError()
    }
    if (application.stage !== APPLICATION_STAGES.AWAITING_APPLICATION_REVIEW) {
      throw new ApplicationPendingError()
    }

    const applicants = await this._getApplicants(application)

    const rentprep = container.make<RentPrep>('rentprep')
    for (const applicant of applicants) {
      await rentprep.fetchBackgroundcheck({
        PackageName: 'Platinum',
        Customer: {
          CreditCard: {
            cardType: form.customer.creditCard.type,
            cardNumber: form.customer.creditCard.number,
            cardSecurity: form.customer.creditCard.security,
            expireMonth: form.customer.creditCard.expiration.month,
            expireYear: form.customer.creditCard.expiration.year
          },
          IPAddress: form.customer.ipAddress,
          billingStreetAddress: form.customer.billingAddress.street,
          billingCity: form.customer.billingAddress.city,
          billingState: form.customer.billingAddress.state,
          billingZip: form.customer.billingAddress.zipcode,
          emailAddress: '',
          firstName: '',
          lastName: '',
          referenceId: ''
        },
        Applicant: {
          dateOfBirth: applicant.history.dob,
          emailAddress: (applicant.user as IUser).email,
          firstName: (applicant.user as IUser).fullName.split(' ')[0],
          lastName: (applicant.user as IUser).fullName.split(' ')[1],
          phone: (applicant.user as IUser).phone,
          postalCode: applicant.history.residences.current.address.zipcode,
          state: applicant.history.residences.current.address.state,
          city: applicant.history.residences.current.address.city,
          streetAddress: applicant.history.residences.current.address.street,
          ssn: applicant.history.ssn
        },
        Employer: {
          companyName: applicant.history.employment.employer || '',
          phone: applicant.history.employment.supervisor.phone || '',
          supervisorFirstName: (
            applicant.history.employment.supervisor.name || ''
          ).split(' ')[0],
          supervisorLastName: (
            applicant.history.employment.supervisor.name || ''
          ).split(' ')[1]
        },
        CurrentLandlord: {
          firstName: applicant.history.residences.current.reference.name.split(
            ' '
          )[0],
          lastName: applicant.history.residences.current.reference.name.split(
            ' '
          )[1],
          phone: applicant.history.residences.current.reference.phone,
          postalCode: applicant.history.residences.current.address.zipcode,
          state: applicant.history.residences.current.address.state,
          streetAddress: applicant.history.residences.current.address.street,
          city: applicant.history.residences.current.address.city
        },
        PreviousLandlord: {
          firstName: applicant.history.residences.previous.reference.name.split(
            ' '
          )[0],
          lastName: applicant.history.residences.previous.reference.name.split(
            ' '
          )[1],
          phone: applicant.history.residences.previous.reference.phone,
          postalCode: applicant.history.residences.previous.address.zipcode,
          state: applicant.history.residences.previous.address.state,
          streetAddress: applicant.history.residences.previous.address.street,
          city: applicant.history.residences.previous.address.city
        },
        RequestParameters: {
          postbackUri: '/wks/rentprep',
          postback_password: process.env.RENT_PREP_BASIC_AUTH_PASSWORD,
          postback_username: process.env.RENT_PREP_BASIC_AUTH_USERNAME,
          referenceId: applicant.id,
          sendCustomerReceipt: true
        }
      })
    }

    application.stage = APPLICATION_STAGES.REQUESTING_BACKGROUND_CHECK
  }

  private async _getApplicants(
    application: IApplication
  ): Promise<IApplicant[]> {
    const Applicant = container.make('models').Applicant as IApplicantModel

    return Applicant.find({
      application
    })
      .populate('user')
      .exec()
  }
}
