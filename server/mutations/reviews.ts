"use server";

import { validateRequest } from "@/lib/auth";
import connectDB from "@/lib/db";
import Review, { IReview } from "@/lib/models/review";
import { ActionResponse } from "@/types/globals";
import { generateTimeBasedId } from "@/utils/functions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createReview = async ({
  title,
  body,
  rating,
  mediaType,
  episodeId,
  seasonId,
  tmdbId,
}: Partial<IReview>): Promise<ActionResponse> => {
  const { session } = await validateRequest();

  if (!session) {
    redirect("/sign-in");
  }

  try {
    await connectDB();

    const review = new Review({
      _id: generateTimeBasedId(),
      title,
      body,
      rating,
      mediaType,
      episodeId,
      seasonId,
      tmdbId,
      user: session.userId,
    });

    await review.save();

    revalidatePath("/movie/[movieId]", "page");
    revalidatePath("/tv-show/[showId]", "layout");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const editReview = async ({
  body,
  rating,
  reviewId,
  title,
}: {
  reviewId: string;
  title: string;
  body: string;
  rating: number;
}) => {
  const { session } = await validateRequest();
  if (!session) redirect("/sign-in");

  try {
    await connectDB();
    const updatedReview = await Review.findByIdAndUpdate(reviewId, {
      title,
      body,
      rating,
    });
    if (!updatedReview) throw new Error("Review not found");
    revalidatePath("/movie/[movieId]", "page");
    revalidatePath("/tv-show/[showId]", "layout");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const deleteReview = async (
  reviewId: string,
): Promise<ActionResponse> => {
  const { session } = await validateRequest();
  if (!session) redirect("/sign-in");

  try {
    await connectDB();
    const deletedReview = await Review.findOneAndDelete({ _id: reviewId });
    if (!deletedReview) throw new Error("Review not found");
    revalidatePath("/movie/[movieId]", "page");
    revalidatePath("/tv-show/[showId]", "layout");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};
