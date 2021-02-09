import { CompleteForm, CompleteResult } from './types'
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
import ApplicationCompleteError from '../../../../errors/ApplicationCompleteError'

export default class ApplicationApply {
  private _email: Email = container.make<Email>(Email)

  constructor(private _baseUrl: string) {}

  async complete(form: CompleteForm): Promise<CompleteResult> {
    const Applicant = container.make('models').Applicant as IApplicantModel

    const applicant = await Applicant.findOne({
      user: form.user.id,
      _id: form.applicantId
    })
      .populate('user')
      .populate('application')
      .exec()
    if (!applicant) {
      throw new NotFoundError()
    }
    const application = applicant.application as IApplication
    if (application.stage > APPLICATION_STAGES.AWAITING_COMPLETION) {
      throw new ApplicationCompleteError()
    }

    applicant.history = form.history as any
    await applicant.save()

    const isComplete = await this._isApplicationComplete(
      applicant.application as IApplication
    )
    if (isComplete) {
      application.stage = APPLICATION_STAGES.AWAITING_APPLICATION_REVIEW
      await application.save()

      await this._notifyLandlord(application)
    }

    return {
      application: applicant.application as IApplication,
      applicant: applicant
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
    })
      .populate('user')
      .exec()
    if (!landlord) {
      return
    }

    await this._email.send({
      email: (landlord.user as IUser).email,
      subject: `Update on Application for ${application.property.address.street}`,
      body: `
        All applicants have completed their application.
        View the completed application or request a background check at ${this._baseUrl}.
      `
    })
  }
}
