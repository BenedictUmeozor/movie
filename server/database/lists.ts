"use server";

import { validateRequest } from "@/lib/auth";
import connectDB from "@/lib/db";
import List, { IList } from "@/lib/models/list";
import { redirect } from "next/navigation";

export const getUserLists = async () => {
  const { session } = await validateRequest();

  if (!session) {
    redirect("/sign-in");
  }

  try {
    await connectDB();

    const lists = await List.find({ userId: session.userId }).lean();
    return lists as IList[];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get user lists");
  }
};
