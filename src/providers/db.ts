import { ContainerInterface } from '@halliganjs/service-container'
import Database from '../services/Database'

export default function (container: ContainerInterface) {
  container.singleton(Database, async () => {
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

    await db.connect()

    return db
  })
}
