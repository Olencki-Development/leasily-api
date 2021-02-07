import { GraphQLError } from 'graphql'

export default function errorHandler(error: GraphQLError): Error {
  // const isLeasilyError = !!error.extensions?.exception.statusCode
  return error
}
