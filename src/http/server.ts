import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
import container from '../container'
import { IUserModel } from '../models/User'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || ''

    const User = container.make('models').User as IUserModel
    const user = await User.findOne().exec()
    if (!user) {
      throw new Error('whoops')
    }
    return { user }
  }
})
const app = express()
server.applyMiddleware({
  app
})

export { app, server }
