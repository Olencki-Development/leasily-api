import * as dotenv from 'dotenv'
import Database from './services/Database'

dotenv.config()

const address = process.env.DB_ADDRESS
if (!address) {
  throw new Error('DB_ADDRESS is not set')
}
const name = process.env.DB_NAME
if (!name) {
  throw new Error('DB_ADDRESS is not set')
}

const uri = Database.parseUri({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  address,
  name
})
const db = new Database(uri)

import { app } from './http/server'

const port = process.env.PORT || 8000
app.listen({ port }, async () => {
  await db.connect()
  console.log(`🚀 Server ready at http://localhost:${port}`)
})
