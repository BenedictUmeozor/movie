import mongoose from "mongoose";
import List from "./list";
import { generateTimeBasedId } from "@/utils/functions";

export interface IUser {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  password: string;
  lists: string[];
  likes: string[];
  reviews: string[];
}

const userSchema = new mongoose.Schema<IUser>(
  {
    _id: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    lists: [{ type: String, ref: "List" }],
    password: { type: String, required: true },
    likes: [{ type: String, ref: "Like" }],
    reviews: [{ type: String, ref: "Review" }],
  } as const,
  { _id: false, timestamps: true },
);

userSchema.post("save", async (document: IUser) => {
  try {
    const userId = document._id;

    const favourite = new List({
      _id: generateTimeBasedId(),
      name: "Favourites",
      description: "My favourite movies and TV shows",
      isPrivate: true,
      isFavourite: true,
      isSaved: false,
      user: userId,
    });

    const saved = new List({
      _id: generateTimeBasedId(),
      name: "Saved",
      description: "My saved movies and TV shows",
      isPrivate: true,
      isFavourite: false,
      isSaved: true,
      user: userId,
    });

    await Promise.all([favourite.save(), saved.save()]);
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
});

const User =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);

export default User;
