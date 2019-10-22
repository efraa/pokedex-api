import { getRepository, Connection } from 'typeorm'

// Entity
import { Gender } from './gender.providers'

export class GenderRepository {
  private _Gender: any

  constructor(private DatabaseConnection: Connection) {
    this.getRepository()
  }

  private async getRepository() {
    await this.DatabaseConnection.connect()
    this._Gender = getRepository(Gender)
    return this._Gender
  }

  public create = async (gender: Gender): Promise<Gender> =>
    await this._Gender.create(gender)

  public getGenderByName = async (name: string): Promise<Gender|undefined> =>
    await this._Gender.findOne({ name })

  public saveGender = async (gender: Gender): Promise<Gender> =>
    await this._Gender.save(gender)
}