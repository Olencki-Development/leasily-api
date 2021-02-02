import { RetrieveForm, RetrieveReturnType } from './types'
import container from '../../../../container'
import { ILandlordModel } from '../../../../models/Landlord'
import { IApplication } from '../../../../models/Application'
import { IApplicantModel } from '../../../../models/Applicant'

export default class ApplicationRetrieve {
  async all(form: RetrieveForm): Promise<RetrieveReturnType> {
    const Landlord = container.make('models').Landlord as ILandlordModel
    const Applicant = container.make('models').Applicant as IApplicantModel

    const landlords = await Landlord.find({
      user: form.user
    })
      .populate('application')
      .exec()

    const returnValue: RetrieveReturnType = []
    for (const landlord of landlords) {
      const application = landlord.application as IApplication

      const applicants = await Applicant.find({
        application
      })
        .populate('user')
        .exec()

      returnValue.push({
        application,
        applicants,
        landlord
      })
    }

    return returnValue
  }
}
