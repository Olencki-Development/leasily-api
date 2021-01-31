import { ContainerInterface } from '@halliganjs/service-container'
import Verify from '../services/Verify'

export default function (container: ContainerInterface) {
  container.singleton(Verify, function () {
    return new Verify()
  })
}
