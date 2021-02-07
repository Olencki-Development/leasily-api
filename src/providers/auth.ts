import { ContainerInterface } from '@halliganjs/service-container'
import Auth from '../services/Auth'

export default function (container: ContainerInterface) {
  container.singleton(Auth, function () {
    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw new Error('JWT_SECRET has not been set')
    }
    return new Auth({
      secret
    })
  })
}
