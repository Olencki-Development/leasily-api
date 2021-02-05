export interface ITransformer<Payload, Entities, Json> {
  in(payload: Payload): Payload

  out(entities: Entities): Json
}
