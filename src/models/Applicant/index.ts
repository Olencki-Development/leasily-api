import { Schema, Document, model, Model, Types } from 'mongoose'
import { IHistory, HistorySchema } from './History'
import { IUser, modelName as userModelName } from '../User'
import { IApplication, modelName as applicationModelName } from '../Application'

export interface IApplicant extends Document {
  history: IHistory
  user: Types.ObjectId | IUser
  application: Types.ObjectId | IApplication

  createdAt: Date
  updatedAt: Date
}

export interface IApplicantModel extends Model<IApplicant> {}

const ApplicantSchema = new Schema<IApplicant>(
  {
    history: {
      type: HistorySchema,
      default: null
    },
    application: {
      type: Types.ObjectId,
      ref: applicationModelName,
      required: true
    },
    user: {
      type: Types.ObjectId,
      ref: userModelName,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const modelName = 'Applicant'
export const ApplicantModel = model<IApplicant, IApplicantModel>(
  modelName,
  ApplicantSchema
)
