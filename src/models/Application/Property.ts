import { Schema, Document } from 'mongoose'

export interface IProperty extends Document {
  address: {
    street: string
    city: string
    state: string
    zipcode: string
  }
  unit: string | null

  createdAt: Date
  updatedAt: Date
}

export const PropertySchema = new Schema<IProperty>(
  {
    address: {
      street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      zipcode: {
        type: String,
        required: true
      }
    },
    unit: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
)
