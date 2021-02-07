import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import resolvers from './resolvers'
import typeDefs from './typeDefs'
import container from '../container'
import Auth from '../services/Auth'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || ''

    if (token) {
      const auth = container.make<Auth>(Auth)
      const user = auth.validate({
        token
      })

      return {
        user
      }
    } else {
      return {
        user: null
      }
    }
  }
})
const app = express()
server.applyMiddleware({
  app
})

export { app, server }
