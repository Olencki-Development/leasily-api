import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

const server = new ApolloServer({ typeDefs, resolvers })
const app = express()
server.applyMiddleware({
  app
})

export { app, server }
