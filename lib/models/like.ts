import mongoose from "mongoose";

export interface ILike {
  _id: string;
  review: string;
  user: string;
  list: string;
}

const likeSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    review: { type: String, ref: "Review" },
    user: { type: String, ref: "User" },
    list: { type: String, ref: "List" },
  } as const,
  { _id: false, timestamps: true },
);

const Like =
  (mongoose.models.Like as mongoose.Model<ILike>) ||
  mongoose.model<ILike>("Like", likeSchema);

export default Like;
