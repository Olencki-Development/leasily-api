import { ContainerInterface } from '@halliganjs/service-container'
import Auth from '../services/Auth'

export default function (container: ContainerInterface) {
  container.singleton(Auth, function () {
    return new Auth()
  })
}
