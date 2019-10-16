import { createConnection, Connection } from 'typeorm'

export class DatabaseConnection {
  public connection: Connection
  constructor (private config: config) {}

  public async connect() : Promise<Connection> {
    const {
      type,
      host,
      username,
      password,
      name: database
    } = this.config.database

    if (this.connection == undefined)
      this.connection = await createConnection({
        type: type as any,
        host,
        username,
        password,
        database,
        synchronize: true,
        entities: ['**/app/components/**/**/*.entity.ts'],
        // ssl: true
      })

    return this.connection
  }

  public isConnectedInfo() {
    console.info('DB Connected...')
  }
}
