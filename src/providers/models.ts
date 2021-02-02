import { ContainerInterface } from '@halliganjs/service-container'
import { UserModel } from '../models/User'
import { ApplicantModel } from '../models/Applicant'
import { ApplicationModel } from '../models/Application'
import { LandlordModel } from '../models/Landlord'

export default function (container: ContainerInterface) {
  container.singleton('models', function () {
    return {
      User: UserModel,
      Landlord: LandlordModel,
      Applicant: ApplicantModel,
      Application: ApplicationModel
    }
  })
}
