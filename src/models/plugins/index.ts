import { Document, Model, FilterQuery } from 'mongoose'

export interface LeasilyDocument extends Document {
  createdAt: Date
  updatedAt: Date
}

export interface LeasilyModel<T extends LeasilyDocument> extends Model<T> {
  findOneOrCreate(filter: FilterQuery<T>, document: Object): Promise<T>
}
