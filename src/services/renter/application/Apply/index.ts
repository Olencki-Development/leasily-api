import { CompleteForm } from './types'
import container from '../../../../container'
import { IUser } from '../../../../models/User'
import { ILandlordModel } from '../../../../models/Landlord'
import { IApplicantModel } from '../../../../models/Applicant'
import {
  IApplication,
  APPLICATION_STAGES
} from '../../../../models/Application'
import NotFoundError from '../../../../errors/NotFoundError'
import Email from '../../../Email'

export default class ApplicationApply {
  private _email: Email = container.make<Email>('email')
  private _baseUrl: string

  constructor() {
    const baseUrl = process.env.BASE_URL
    if (!baseUrl) {
      throw new Error('BASE_URL is not set')
    }

    this._baseUrl = baseUrl
  }

  async complete(form: CompleteForm): Promise<void> {
    const Applicant = container.make('models').Applicant as IApplicantModel

    const applicant = await Applicant.findOne({
      user: form.user,
      id: form.applicantId
    })
      .populate('application')
      .exec()
    if (!applicant) {
      throw new NotFoundError()
    }

    applicant.history = form.history as any
    await applicant.save()

    const isComplete = await this._isApplicationComplete(
      applicant.application as IApplication
    )
    if (isComplete) {
      const application = applicant.application as IApplication
      application.stage = APPLICATION_STAGES.AWAITING_APPLICATION_REVIEW
      await application.save()

      await this._notifyLandlord(application)
    }
  }

  private async _isApplicationComplete(
    application: IApplication
  ): Promise<boolean> {
    const Applicant = container.make('models').Applicant as IApplicantModel

    const applicants = await Applicant.find({
      application
    }).exec()

    const isIncomplete = applicants.find((applicant) => {
      return !applicant.history
    })

    return !isIncomplete
  }

  private async _notifyLandlord(application: IApplication) {
    const Landlord = container.make('models').Landlord as ILandlordModel
    const landlord = await Landlord.findOne({
      application
    }).exec()
    if (!landlord) {
      return
    }

    await this._email.send({
      email: (landlord.user as IUser).email,
      subject: `Update on Application for ${
        (landlord.application as IApplication).property.address.street
      }`,
      body: `
        All applicants have completed their application.
        View the completed application or request a background check at ${this._baseUrl}.
      `
    })
  }
}
