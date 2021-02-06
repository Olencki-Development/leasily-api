import { UserJson } from './types'
import { IUser } from '../models/User'

type Entity = {
  user: IUser
}

export default function toJson(entity: Entity): UserJson {
  return {
    id: entity.user.id,
    fullName: entity.user.fullName,
    email: entity.user.email,
    phone: entity.user.phone,
    createdAt: entity.user.createdAt.toISOString(),
    updatedAt: entity.user.updatedAt.toISOString()
  }
}
