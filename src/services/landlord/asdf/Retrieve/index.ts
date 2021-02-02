import { AllForm, ByIdForm, RetrieveReturnType } from './types'
import container from '../../../../container'
import { ILandlordModel } from '../../../../models/Landlord'
import { IApplication } from '../../../../models/Application'
import { IApplicantModel } from '../../../../models/Applicant'
import NotFoundError from '../../../../errors/NotFoundError'

export default class ApplicationRetrieve {
  async all(form: AllForm): Promise<RetrieveReturnType[]> {
    const Landlord = container.make('models').Landlord as ILandlordModel
    const Applicant = container.make('models').Applicant as IApplicantModel

    const landlords = await Landlord.find({
      user: form.user
    })
      .populate('application')
      .exec()

    const returnValue: RetrieveReturnType[] = []
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

  async byId(form: ByIdForm): Promise<RetrieveReturnType> {
    const Landlord = container.make('models').Landlord as ILandlordModel
    const Applicant = container.make('models').Applicant as IApplicantModel

    const landlord = await Landlord.findOne({
      user: form.user,
      application: form.applicationId
    })
      .populate('application')
      .exec()

    if (!landlord) {
      throw new NotFoundError()
    }

    const application = landlord.application as IApplication

    const applicants = await Applicant.find({
      application
    })
      .populate('user')
      .exec()

    return {
      application,
      applicants,
      landlord
    }
  }
}
