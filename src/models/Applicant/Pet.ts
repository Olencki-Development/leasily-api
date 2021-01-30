import { Schema, Document } from 'mongoose'

export interface IPet extends Document {
  type: string
  breed: string
  name: string

  createdAt: Date
  updatedAt: Date
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
