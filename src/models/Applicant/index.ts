import { Schema, model, Types } from 'mongoose'
import { LeasilyDocument, LeasilyModel } from '../plugins'
import { IHistory, HistorySchema } from './History'
import { IUser, modelName as userModelName } from '../User'
import { IApplication, modelName as applicationModelName } from '../Application'

export interface IApplicant extends LeasilyDocument {
  history: IHistory
  user: Types.ObjectId | IUser
  application: Types.ObjectId | IApplication
}

export interface IApplicantModel extends LeasilyModel<IApplicant> {}

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
