import { CreateForm, ApplicantForm, CreateReturnType } from './types'
import container from '../../../../container'
import { IApplication, IApplicationModel } from '../../../../models/Application'
import { IApplicant, IApplicantModel } from '../../../../models/Applicant'
import { IUser, IUserModel } from '../../../../models/User'
import { ILandlord, ILandlordModel } from '../../../../models/Landlord'
import Email from '../../../Email'

export default class ApplicationCreate {
  private _email: Email = container.make<Email>('email')
  private _baseUrl: string

  constructor() {
    const baseUrl = process.env.BASE_URL
    if (!baseUrl) {
      throw new Error('BASE_URL is not set')
    }

    this._baseUrl = baseUrl
  }

  async create(form: CreateForm): Promise<CreateReturnType> {
    const Application = container.make('models')
      .Application as IApplicationModel

    const application = await Application.create({
      property: form.property,
      lease: form.lease,
      waitPeriodInDays: form.waitPeriodInDays,
      fee: form.fee
    })

    const applicants: IApplicant[] = []
    for (const applicantForm of form.applicants) {
      const applicant = await this._getApplicant(applicantForm, application)
      applicants.push(applicant)
    }

    const landlord = await this._getLandlord(application, form.user)

    return {
      application,
      applicants,
      landlord
    }
  }

  private async _getApplicant(
    applicantForm: ApplicantForm,
    application: IApplication
  ): Promise<IApplicant> {
    const User = container.make('models').User as IUserModel
    const Applicant = container.make('models').Applicant as IApplicantModel

    const user = await User.findOneOrCreate(
      {
        email: applicantForm.email
      },
      applicantForm
    )

    const applicant = await Applicant.create({
      user,
      application
    })

    await this._sendApplyEmail(application, applicant)

    return applicant
  }

  private async _getLandlord(
    application: IApplication,
    user: IUser
  ): Promise<ILandlord> {
    const Landlord = container.make('models').Landlord as ILandlordModel

    return Landlord.create({
      user,
      application
    })
  }

  private async _sendApplyEmail(
    application: IApplication,
    applicant: IApplicant
  ) {
    await this._email.send({
      email: (applicant.user as IUser).email,
      subject: `Application for ${application.property.address.street}`,
      body: `
        You've been invited to apply to:
        ${application.property.address.street}
        ${application.property.address.city}, ${application.property.address.state} ${application.property.address.zipcode}

        Use this link to complete the application:
        ${this._baseUrl}/apply/${applicant.id}
      `
    })
  }
}
