import { Container } from '@halliganjs/service-container'
import modelsProvider from './providers/models'
import mailProvider from './providers/mail'
import rentprepProvider from './providers/rentprep'
import verifyProvider from './providers/verify'
import authProvider from './providers/auth'
import dbProvider from './providers/db'
import landlordProvider from './providers/landlord'

const container = new Container()
container
  .provider(modelsProvider)
  .provider(mailProvider)
  .provider(rentprepProvider)
  .provider(verifyProvider)
  .provider(authProvider)
  .provider(dbProvider)
  .provider(landlordProvider)

export default container
