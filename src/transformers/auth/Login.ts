import { ITransformer } from '../types'
import validator from '../../services/validation'
import { IUser } from '../../models/User'

type Payload = {
  email: string
}

type Entities = {
  user: IUser
}

type Json = {}

export default class LoginTransformer
  implements ITransformer<Payload, Entities, Json> {
  in(payload: Payload): Payload {
    const schema = validator.object({
      email: validator.string().email().trim().required()
    })

    const result = schema.validate(payload)
    if (result.error) {
      throw result.error
    }

    return result.value
  }

  out(): Json {
    return {}
  }
}
