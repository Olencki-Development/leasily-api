import { Schema } from 'mongoose'
import { LeasilyDocument } from '../plugins'

export interface ILease extends LeasilyDocument {
  securityDeposit: {
    amount: number
    hasBeenCollected: boolean
  }
  rent: {
    amount: number
  }
  lengthInMonths: number
  startDate: Date

  isMonthToMonth(): boolean
}

export const LeaseSchema = new Schema<ILease>(
  {
    securityDeposit: {
      amount: {
        type: Number,
        required: true,
        min: 1
      },
      hasBeenCollected: {
        type: Boolean,
        default: false
      }
    },
    rent: {
      amount: {
        type: Number,
        required: true,
        min: 1
      }
    },
    lengthInMonths: {
      type: Number,
      required: true,
      min: 1
    },
    startDate: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
)

LeaseSchema.methods.isMonthToMonth = function () {
  return this.lengthInMonths === 1
}
