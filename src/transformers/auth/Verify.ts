import { ITransformer, UserJson } from '../types'
import validator from '../../services/validation'
import { IUser } from '../../models/User'

type Payload = {
  email: string
  code: string
}

type Entities = {
  user: IUser
}

type Json = {
  user: UserJson
}

export default class VerifyTransformer
  implements ITransformer<Payload, Entities, Json> {
  in(payload: Payload): Payload {
    const schema = validator.object({
      email: validator.string().email().trim().required(),
      code: validator.string().trim().length(6).required()
    })

    const result = schema.validate(payload)
    if (result.error) {
      throw result.error
    }

    return result.value
  }

  out(entities: Entities): Json {
    return {
      user: {
        id: entities.user.id,
        fullName: entities.user.fullName,
        email: entities.user.email,
        phone: entities.user.phone,
        createdAt: entities.user.createdAt.toISOString(),
        updatedAt: entities.user.updatedAt.toISOString()
      }
    }
  }
}
