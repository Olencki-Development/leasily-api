import { ContainerInterface } from '@halliganjs/service-container'
import Retrieve from '../services/renter/application/Retrieve'
import Apply from '../services/renter/application/Apply'

export default function (container: ContainerInterface) {
  container.singleton(Retrieve, function () {
    return new Retrieve()
  })

  container.singleton(Apply, function () {
    const baseUrl = process.env.BASE_URL
    if (!baseUrl) {
      throw new Error('BASE_URL not set')
    }
    return new Apply(baseUrl)
  })
}
