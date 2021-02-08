import { connect, Connection, plugin, connection } from 'mongoose'
import { DatabaseOptions } from './types'
import findOneOrCreate from '../../models/plugins/findOneOrCreate'

export default class Database {
  private uri: string
  database?: Connection

  static parseUri(options: DatabaseOptions) {
    let uri = `${options.address}/${options.name}`
    if (options.username && options.password) {
      uri = `${options.username}:${options.password}@${uri}?authSource=admin`
    }
    return `mongodb://${uri}`
  }

  constructor(uri: string) {
    this.uri = uri

    plugin(findOneOrCreate as any)
  }

  connect() {
    const self = this
    return new Promise<void>(function (resolve) {
      if (self.database) {
        return resolve()
      }
      connect(self.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      self.database = connection
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
}
