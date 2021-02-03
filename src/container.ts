import { Container } from '@halliganjs/service-container'
import modelsProvider from './providers/models'
import mailProvider from './providers/mail'
import rentprepProvider from './providers/rentprep'
import verifyProvider from './providers/verify'

const container = new Container()
container
  .provider(modelsProvider)
  .provider(mailProvider)
  .provider(rentprepProvider)
  .provider(verifyProvider)

export default container
