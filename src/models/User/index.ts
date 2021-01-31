import { Schema, Document, model, Model } from 'mongoose'

export interface IUser extends Document {
  fullName: string
  email: string
  phone: string

  createdAt: Date
  updatedAt: Date
}

export interface IUserModel extends Model<IUser> {}

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
