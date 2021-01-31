import { ContainerInterface } from '@halliganjs/service-container'
import { UserModel } from '../models/User'
import { ApplicantModel } from '../models/Applicant'
import { ApplicationModel } from '../models/Application'

export default function (container: ContainerInterface) {
  container.singleton('models', function () {
    return {
      User: UserModel,
      Applicant: ApplicantModel,
      Application: ApplicationModel
    }
  })
}
