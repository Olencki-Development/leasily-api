import { ITransformer } from '../types'
import validator from '../../services/validation'
import { IUser } from '../../models/User'

type Payload = {
  fullName: string
  email: string
  phone: string
}

type Entities = {
  user: IUser
}

type Json = {}

export default class RegisterTransformer
  implements ITransformer<Payload, Entities, Json> {
  in(payload: Payload): Payload {
    const schema = validator.object({
      fullName: validator.string().trim().required(),
      email: validator.string().email().trim().required(),
      phone: validator
        .string()
        .trim()
        .phoneNumber({ defaultCountry: 'US', format: 'national' })
        .required()
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
