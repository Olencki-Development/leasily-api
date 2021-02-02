import { Schema, model } from 'mongoose'
import { LeasilyModel, LeasilyDocument } from '../plugins'

export interface IUser extends LeasilyDocument {
  fullName: string
  email: string
  phone: string
}

export interface IUserModel extends LeasilyModel<IUser> {}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    }
  },
  {
    timestamps: true
  }
)

export const modelName = 'User'
export const UserModel = model<IUser, IUserModel>(modelName, UserSchema)
