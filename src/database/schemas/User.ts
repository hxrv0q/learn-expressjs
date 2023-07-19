import { Schema, model } from "mongoose";

interface IUser {
  username: string;
  password: string;
  email: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Schema.Types.Date, required: true, default: new Date() },
})

const User = model<IUser>('User', userSchema);

export default User;