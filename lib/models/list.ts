import mongoose from "mongoose";
import User from "./user";
import Like from "./like";

export interface IListItem {
  tmdbId: number;
  posterPath: string;
  title: string;
  mediaType: "movie" | "tv-show";
}

export interface IList {
  _id: string;
  name: string;
  description: string;
  items: IListItem[];
  isPrivate: boolean;
  isFavourite: boolean;
  isSaved: boolean;
  user: string;
  likes: string[];
}

const listSchema = new mongoose.Schema<IList>(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    items: [
      {
        tmdbId: { type: Number, required: true },
        posterPath: { type: String, required: true },
        title: { type: String, required: true },
        mediaType: { type: String, enum: ["movie", "tv-show"], required: true },
      },
    ],
    isPrivate: { type: Boolean, required: true, default: false },
    isFavourite: { type: Boolean, required: true, default: false },
    isSaved: { type: Boolean, required: true, default: false },
    user: { type: String, ref: "User" },
    likes: [{ type: String, ref: "Like" }],
  } as const,
  { timestamps: true, _id: false },
);

listSchema.post("save", async (document: IList) => {
  try {
    const listId = document._id;
    const userId = document.user;

    await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { lists: listId },
      },
      { new: true },
    );
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
});

listSchema.post("findOneAndDelete", async (document: IList) => {
  try {
    const listId = document._id;

    await User.updateOne(
      { lists: listId },
      {
        $pull: { lists: listId },
      },
    );

    await Like.deleteMany({ list: listId });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
});

const List =
  (mongoose.models.List as mongoose.Model<IList>) ||
  mongoose.model<IList>("List", listSchema);

export default List;
