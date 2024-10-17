"use server";

import { validateRequest } from "@/lib/auth";
import connectDB from "@/lib/db";
import Like from "@/lib/models/like";
import { ActionResponse } from "@/types/globals";
import { generateTimeBasedId } from "@/utils/functions";
import { revalidatePath } from "next/cache";

export const unlikeList = async ({
  listId,
}: {
  listId: string;
}): Promise<ActionResponse> => {
  try {
    const { session } = await validateRequest();
    if (!session) throw new Error("You are not logged in");

    const like = await Like.findOneAndDelete({
      user: session.userId,
      list: listId,
    });

    if (!like) throw new Error("Like not found");

    revalidatePath("/lists");
    revalidatePath("/lists/[listId]", "page");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const likeList = async ({
  listId,
}: {
  listId: string;
}): Promise<ActionResponse> => {
  try {
    const { session } = await validateRequest();
    if (!session) throw new Error("You are not logged in");

    await connectDB();

    const like = new Like({
      _id: generateTimeBasedId(),
      list: listId,
      user: session.userId,
    });

    await like.save();
    revalidatePath("/lists");
    revalidatePath("/lists/[listId]", "page");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const likeReview = async ({
  reviewId,
}: {
  reviewId: string;
}): Promise<ActionResponse> => {
  try {
    const { session } = await validateRequest();
    if (!session) throw new Error("You are not logged in");

    await connectDB();

    const like = new Like({
      _id: generateTimeBasedId(),
      user: session.userId,
      review: reviewId,
    });

    await like.save();
    revalidatePath("/movie/[movieId]", "page");
    revalidatePath("/tv-show/[showId]", "layout");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const unlikeReview = async ({
  reviewId,
}: {
  reviewId: string;
}): Promise<ActionResponse> => {
  try {
    const { session } = await validateRequest();
    if (!session) throw new Error("You are not logged in");

    const like = await Like.findOneAndDelete({
      user: session.userId,
      review: reviewId,
    });

    if (!like) throw new Error("Like not found");

    revalidatePath("/movie/[movieId]", "page");
    revalidatePath("/tv-show/[showId]", "layout");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
