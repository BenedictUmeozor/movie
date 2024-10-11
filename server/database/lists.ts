"use server";

import { validateRequest } from "@/lib/auth";
import connectDB from "@/lib/db";
import List, { IList } from "@/lib/models/list";
import { ListWithUserAndLikes } from "@/types/mongodb";
import { redirect } from "next/navigation";

export const getAllLists = async () => {
  try {
    await connectDB();

    const lists = await List.find({
      isPrivate: false,
      isFavourite: false,
      isSaved: false,
    })
      .populate({
        path: "user",
        select: "-password -createdAt -updatedAt -__v",
      })
      .populate({
        path: "likes",
        select: "user",
      })
      .lean();
    return lists as unknown as ListWithUserAndLikes[];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get user lists");
  }
};

export const getUserLists = async () => {
  const { session } = await validateRequest();

  if (!session) {
    redirect("/sign-in");
  }

  try {
    await connectDB();

    const lists = await List.find({ user: session.userId }).lean();
    return lists as IList[];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get user lists");
  }
};

export const getParticularList = async (listId: string) => {
  try {
    await connectDB();
    const list = await List.findById(listId)
      .populate({
        path: "user",
        select: "-password -createdAt -updatedAt -__v",
      })
      .populate({
        path: "likes",
        select: "user",
      })
      .lean();
    return list as unknown as ListWithUserAndLikes;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get user lists");
  }
};
