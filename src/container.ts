import { Container } from '@halliganjs/service-container'
import modelsProvider from './providers/models'

const container = new Container()
container.provider(modelsProvider)

export default container
