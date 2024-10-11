import mongoose from "mongoose";
import User from "./user";
import Review from "./review";
import List from "./list";

export interface ILike {
  _id: string;
  user: string;
  review?: string;
  list?: string;
}

const likeSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    review: { type: String, ref: "Review" },
    user: { type: String, ref: "User", required: true },
    list: { type: String, ref: "List" },
  } as const,
  { _id: false, timestamps: true },
);

likeSchema.post("save", async (document: ILike) => {
  try {
    const likeId = document._id;
    const { review, user, list } = document;

    if (review) {
      await Review.updateOne({ _id: review }, { $push: { likes: likeId } });
    }
    if (user) {
      await User.updateOne({ _id: user }, { $push: { likes: likeId } });
    }
    if (list) {
      await List.updateOne({ _id: list }, { $push: { likes: likeId } });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
});

likeSchema.post("findOneAndDelete", async (document: ILike) => {
  try {
    const likeId = document._id;

    await User.updateMany({ likes: likeId }, { $pull: { likes: likeId } });
    await Review.updateMany({ likes: likeId }, { $pull: { likes: likeId } });
    await List.updateMany({ likes: likeId }, { $pull: { likes: likeId } });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
});

const Like =
  (mongoose.models.Like as mongoose.Model<ILike>) ||
  mongoose.model<ILike>("Like", likeSchema);

export default Like;
