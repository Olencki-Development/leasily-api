import { Schema } from 'mongoose'
import { LeasilyDocument } from '../plugins'

export interface IProperty extends LeasilyDocument {
  address: {
    street: string
    city: string
    state: string
    zipcode: string
  }
  unit: string | null
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
