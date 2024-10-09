import mongoose from "mongoose";

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  lists: string[];
}

const userSchema = new mongoose.Schema<IUser>(
  {
    _id: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    lists: [{ type: String, ref: "List" }],
    password: { type: String, required: true },
  } as const,
  { _id: false, timestamps: true },
);

const User =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);

export default User;
