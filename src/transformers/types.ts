export interface ITransformer<Payload, Entities, Json> {
  in(payload: Payload): Payload

  out(entities: Entities): Json
}

type ModelJson = {
  id: string

  createdAt: string
  updatedAt: string
}

export type UserJson = ModelJson & {
  fullName: string
  email: string
  phone: string
}
