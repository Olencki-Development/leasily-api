import { Schema, model, Types } from 'mongoose'
import { LeasilyDocument, LeasilyModel } from '../plugins'
import { IUser, modelName as userModelName } from '../User'
import { IApplication, modelName as applicationModelName } from '../Application'

export interface ILandlord extends LeasilyDocument {
  user: Types.ObjectId | IUser
  application: Types.ObjectId | IApplication
}

export interface ILandlordModel extends LeasilyModel<ILandlord> {}

const LandlordSchema = new Schema<ILandlord>(
  {
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

export const modelName = 'Landlord'
export const LandlordModel = model<ILandlord, ILandlordModel>(
  modelName,
  LandlordSchema
)
