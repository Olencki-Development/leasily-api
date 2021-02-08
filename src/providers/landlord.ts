import { ContainerInterface } from '@halliganjs/service-container'
import Retrieve from '../services/landlord/application/Retrieve'
import Create from '../services/landlord/application/Create'

export default function (container: ContainerInterface) {
  container.singleton(Retrieve, function () {
    return new Retrieve()
  })

  container.singleton(Create, function () {
    const baseUrl = process.env.BASE_URL
    if (!baseUrl) {
      throw new Error('BASE_URL not set')
    }
    return new Create(baseUrl)
  })
}
