"use server";

import connectDB from "@/lib/db";
import Review from "@/lib/models/review";
import { ReviewWithUserAndLikes } from "@/types/mongodb";
import { cache } from "react";

export const getMovieReviews = cache(async (tmdbId: number) => {
  try {
    await connectDB();
    const reviews = await Review.find({ tmdbId, mediaType: "movie" })
      .populate({
        path: "user",
        select: "-password -createdAt -updatedAt -__v",
      })
      .populate({
        path: "likes",
        select: "user",
      })
      .lean();
    return reviews as unknown as ReviewWithUserAndLikes[];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get movie reviews");
  }
});
