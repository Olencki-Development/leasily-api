import { Schema, FilterQuery } from 'mongoose'
import { LeasilyModel, LeasilyDocument } from './'

export default async function findOneOrCreate(
  schema: Schema<LeasilyDocument, LeasilyModel<LeasilyDocument>>
) {
  schema.statics.findOneOrCreate = async function <T extends LeasilyDocument>(
    filter: FilterQuery<T>,
    document: Object
  ): Promise<T> {
    const self = (this as any) as LeasilyModel<T>
    const item = await self.findOne(filter)
    if (item) {
      return item
    }

    return self.create(document)
  }
}
