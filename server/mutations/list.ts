"use server";

import { validateRequest } from "@/lib/auth";
import List from "@/lib/models/list";
import User from "@/lib/models/user";
import { listSchema } from "@/lib/zod";
import { ActionResponse } from "@/types/globals";
import { generateTimeBasedId } from "@/utils/functions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

type FormSchema = z.infer<typeof listSchema>;

export const createList = async ({
  description,
  isPrivate,
  name,
}: FormSchema): Promise<ActionResponse> => {
  const { session } = await validateRequest();

  if (!session) {
    redirect("/sign-in");
  }

  try {
    const exists = await List.exists({ name });
    if (exists) throw new Error("List already exists");

    const list = await List.create({
      _id: generateTimeBasedId(),
      name,
      description,
      isPrivate,
      userId: session.userId,
    });

    const user = await User.findByIdAndUpdate(
      session.userId,
      {
        $push: { lists: list._id },
      },
      { new: true },
    );

    if (!user) throw new Error("User not found");

    revalidatePath("/my-lists");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};
