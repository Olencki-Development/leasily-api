import { Schema, Document } from 'mongoose'

export interface ILease extends Document {
  securityDeposit: {
    amount: number
    hasBeenCollected: boolean
  }
  rent: {
    amount: number
  }
  lengthInMonths: number
  startDate: Date

  createdAt: Date
  updatedAt: Date

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
