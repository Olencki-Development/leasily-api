import * as Mongoose from 'mongoose'
import { DatabaseOptions } from './types'

export default class Database {
  private uri: string
  database?: Mongoose.Connection

  static parseUri(options: DatabaseOptions) {
    let uri = `${options.address}/${options.name}`
    if (options.username && options.password) {
      uri = `${options.username}:${options.password}@${uri}?authSource=admin`
    }
    return `mongodb://${uri}`
  }

  constructor(uri: string) {
    this.uri = uri
  }

  connect() {
    const self = this
    return new Promise<void>(function (resolve) {
      if (self.database) {
        return resolve()
      }
      Mongoose.connect(self.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      self.database = Mongoose.connection
      self.database.once('open', async () => {
        console.log('Connected to database')
        resolve()
      })
      self.database.on(
        'error',
        console.error.bind(console, 'An with the database has occured: ')
      )
    })
  }

  disconnect() {
    Mongoose.disconnect()
  }
}
