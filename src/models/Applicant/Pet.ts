import { Schema } from 'mongoose'
import { LeasilyDocument } from '../plugins'

export interface IPet extends LeasilyDocument {
  type: string
  breed: string
  name: string
}

export const PetSchema = new Schema<IPet>(
  {
    type: {
      type: String,
      required: true
    },
    breed: {
      type: String,
      require: true
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)
