import { Schema, model } from 'mongoose'
import { LeasilyModel, LeasilyDocument } from '../plugins'
import { PropertySchema, IProperty } from './Property'
import { LeaseSchema, ILease } from './Lease'

export enum APPLICATION_STAGES {
  AWAITING_COMPLETION,
  REQUESTING_BACKGROUND_CHECK,
  AWAITING_APPLICATION_REVIEW,
  RENTED
}

export interface IApplication extends LeasilyDocument {
  property: IProperty
  lease: ILease
  stage: APPLICATION_STAGES
  isClosed: boolean
  fee: number
  waitPeriodInDays: number
}

export interface IApplicationModel extends LeasilyModel<IApplication> {}

const ApplicationSchema = new Schema<IApplication>(
  {
    property: {
      type: PropertySchema,
      required: true
    },
    stage: {
      type: APPLICATION_STAGES,
      default: APPLICATION_STAGES.AWAITING_COMPLETION
    },
    isClosed: {
      type: Boolean,
      default: false
    },
    lease: {
      type: LeaseSchema,
      required: true
    },
    fee: {
      type: Number,
      required: true
    },
    waitPeriodInDays: {
      type: Number,
      default: 5
    }
  },
  {
    timestamps: true
  }
)

export const modelName = 'Application'
export const ApplicationModel = model<IApplication, IApplicationModel>(
  modelName,
  ApplicationSchema
)
