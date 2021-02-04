import { ContainerInterface } from '@halliganjs/service-container'
import Retrieve from '../services/landlord/application/Retrieve'

export default function (container: ContainerInterface) {
  container.singleton(Retrieve, function () {
    return new Retrieve()
  })
}
