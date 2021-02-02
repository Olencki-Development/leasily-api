import { CompleteForm } from './types'
import container from '../../../../container'
import { IApplicantModel } from '../../../../models/Applicant'
import {
  IApplication,
  APPLICATION_STAGES
} from '../../../../models/Application'
import NotFoundError from '../../../../errors/NotFoundError'

export default class ApplicationApply {
  async complete(form: CompleteForm): Promise<void> {
    const Applicant = container.make('models').Applicant as IApplicantModel

    const applicant = await Applicant.findOne({
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
}
