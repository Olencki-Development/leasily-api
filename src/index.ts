import * as dotenv from 'dotenv'
// import { app, server } from './http/server'
import container from './container'
import Database from './services/Database'

dotenv.config()

const port = process.env.PORT || 8000
// app.listen({ port }, async () => {
//   await container.make<Promise<void>>(Database)
//   console.log(
//     `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
//   )
// })
