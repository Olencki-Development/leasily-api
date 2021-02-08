import { ByIdForm, ByIdResult } from './types'
import container from '../../../../container'
import { IApplicantModel } from '../../../../models/Applicant'
import { IApplication } from '../../../../models/Application'
import NotFoundError from '../../../../errors/NotFoundError'

export default class ApplicationRetrieve {
  async byId(form: ByIdForm): Promise<ByIdResult> {
    const Applicant = container.make('models').Applicant as IApplicantModel
    const applicant = await Applicant.findOne({
      _id: form.applicantId,
      user: form.user.id
    })
      .populate('application')
      .populate('user')
      .exec()

    if (!applicant) {
      throw new NotFoundError()
    }

    return {
      applicant,
      application: applicant.application as IApplication
    }
  }
}
