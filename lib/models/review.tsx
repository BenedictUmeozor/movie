import mongoose from "mongoose";

export interface IReview {
  _id: string;
  title: string;
  body: string;
  rating: number;
  tmdbId: number;
  mediaType: "movie" | "tv-show" | "season" | "episode";
  user: string;
  episodeId?: number;
  seasonId?: number;
  likes: string[];
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    rating: { type: Number, required: true },
    tmdbId: { type: Number, required: true },
    mediaType: {
      type: String,
      enum: ["movie", "tv-show", "season", "episode"],
      required: true,
    },
    user: { type: String, ref: "User" },
    episodeId: { type: Number },
    seasonId: { type: Number },
    likes: [{ type: String, ref: "Like" }],
  } as const,
  { _id: false, timestamps: true },
);

const Review =
  (mongoose.models.Review as mongoose.Model<IReview>) ||
  mongoose.model<IReview>("Review", reviewSchema);

export default Review;
