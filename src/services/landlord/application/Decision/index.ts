import { ApproveForm, DeclineForm } from './types'
import container from '../../../../container'
import Email from '../../../Email'
import { IUser } from '../../../../models/User'
import { IApplicant, IApplicantModel } from '../../../../models/Applicant'
import {
  IApplication,
  IApplicationModel,
  APPLICATION_STAGES
} from '../../../../models/Application'
import ApplicationResolvedError from '../../../../errors/ApplicationResolvedError'
import NotFoundError from '../../../../errors/NotFoundError'

export default class ApplicationDecision {
  private _email: Email = container.make<Email>('email')

  async approve(form: ApproveForm): Promise<IApplication> {
    const Application = container.make('models')
      .Application as IApplicationModel
    const application = await Application.findOne({
      id: form.applicationId
    })
    if (!application) {
      throw new NotFoundError()
    }

    if (this._hasDecisionBeenMade(application)) {
      throw new ApplicationResolvedError()
    }

    application.stage = APPLICATION_STAGES.RENTED

    const applicants = await this._getApplicants(application)
    for (const applicant of applicants) {
      await this._sendApprovedEmail(application, applicant)
    }

    return application.save()
  }

  async decline(form: DeclineForm): Promise<IApplication> {
    const Application = container.make('models')
      .Application as IApplicationModel
    const application = await Application.findOne({
      id: form.applicationId
    })
    if (!application) {
      throw new NotFoundError()
    }

    if (this._hasDecisionBeenMade(application)) {
      throw new ApplicationResolvedError()
    }

    application.isClosed = true

    const applicants = await this._getApplicants(application)
    for (const applicant of applicants) {
      await this._sendDeclinedEmail(application, applicant)
    }

    return application.save()
  }

  private _hasDecisionBeenMade(application: IApplication): boolean {
    if (application.isClosed) {
      return true
    }
    if (application.stage >= APPLICATION_STAGES.RENTED) {
      return true
    }

    return false
  }

  private _getApplicants(application: IApplication): Promise<IApplicant[]> {
    const Applicant = container.make('models').Applicant as IApplicantModel
    return Applicant.find({
      application
    }).exec()
  }

  private async _sendDeclinedEmail(
    application: IApplication,
    applicant: IApplicant
  ) {
    await this._email.send({
      email: (applicant.user as IUser).email,
      subject: `Application for ${application.property.address.street}`,
      body: `
        Your application for:
        ${application.property.address.street}
        ${application.property.address.city}, ${application.property.address.state} ${application.property.address.zipcode}

        has been declined. Should you choose to rent with this owner/agency in the future, please re-apply.
      `
    })
  }

  private async _sendApprovedEmail(
    application: IApplication,
    applicant: IApplicant
  ) {
    await this._email.send({
      email: (applicant.user as IUser).email,
      subject: `Application for ${application.property.address.street}`,
      body: `
        Your application for:
        ${application.property.address.street}
        ${application.property.address.city}, ${application.property.address.state} ${application.property.address.zipcode}

        has been approved. You should reach out to the owner/agency for next steps in the renting process.
      `
    })
  }
}
