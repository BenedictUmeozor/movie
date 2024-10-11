"use server";

import { validateRequest } from "@/lib/auth";
import connectDB from "@/lib/db";
import List, { IList } from "@/lib/models/list";
import { ListWithUser } from "@/types/mongodb";
import { redirect } from "next/navigation";

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
      .lean();
    return list as unknown as ListWithUser;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get user lists");
  }
};
