import * as express from 'express'
import * as compression from 'compression'
import * as helmet from 'helmet'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

import routes from './routes'
import errorHandler from './errorHandler'

const app = express()

app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
app.use(cors())

app.use('/api', routes)
app.use(errorHandler)

export { app }
