import { getRepository, Connection, MoreThanOrEqual } from 'typeorm'

// Entity
import { User } from '../user/user.providers'

export class AuthRepository {
  private _User: any

  constructor(private DatabaseConnection: Connection) {
    this.getUserRepository()
  }

  private async getUserRepository() {
    await this.DatabaseConnection.connect()
    this._User = getRepository(User)
    return this._User
  }

  public create = async (user: User): Promise<User> =>
    await this._User.create(user)

  public getUserByEmail = async (email: string): Promise<User|undefined> =>
    await this._User.findOne({ email })

  public getUserByUsername = async (username: string): Promise<User|undefined> =>
    await this._User.findOne({ username })

  public saveUser = async (user: User): Promise<User> =>
    await this._User.save(user)

  public update = async (user: User, update: {}): Promise<User> =>
    await this._User.merge(user, update)

  public count = async (): Promise<number> => await this._User.count()

  public getUserByForgotPasswordToken = async (token: string): Promise<User|undefined> =>
    await this._User.findOne({
      forgotPassword: {
        token,
        expire: MoreThanOrEqual(new Date())
      }
    })
}
