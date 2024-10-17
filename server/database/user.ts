"use server";

import { validateRequest } from "@/lib/auth";
import connectDB from "@/lib/db";
import User, { IUser } from "@/lib/models/user";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getUser = cache(async (_id: string) => {
  const { session } = await validateRequest();

  if (!session) redirect("/sign-in");

  await connectDB();
  const user = await User.findById(_id)
    .select("-password -createdAt -updatedAt -__v")
    .lean();
  return user as IUser;
});
