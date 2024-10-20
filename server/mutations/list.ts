"use server";

import { validateRequest } from "@/lib/auth";
import connectDB from "@/lib/db";
import List, { IListItem } from "@/lib/models/list";
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
    await connectDB();
    const exists = await List.exists({ name });
    if (exists) throw new Error("List already exists");

    const list = new List({
      _id: generateTimeBasedId(),
      name,
      description,
      isPrivate,
      user: session.userId,
    });

    await list.save();

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const addToList = async ({
  mediaType,
  posterPath,
  title,
  tmdbId,
  listId,
}: IListItem & { listId: string }): Promise<ActionResponse> => {
  const { session } = await validateRequest();

  if (!session) {
    redirect("/sign-in");
  }

  try {
    await connectDB();

    const item: IListItem = {
      mediaType,
      posterPath,
      title,
      tmdbId,
    };

    const list = await List.findById(listId);

    if (!list) throw new Error("List not found");

    const exists = list.items.some((item) => item.tmdbId === tmdbId);
    if (exists) throw new Error("Item already exists in list");

    list.items.push(item);
    await list.save();

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const changeList = async ({
  fromListId,
  mediaType,
  posterPath,
  title,
  tmdbId,
  toListId,
}: {
  fromListId: string;
  toListId: string;
} & IListItem): Promise<ActionResponse> => {
  const { session } = await validateRequest();
  if (!session) redirect("/sign-in");

  try {
    await connectDB();
    const item: IListItem = {
      mediaType,
      posterPath,
      title,
      tmdbId,
    };

    const list = await List.findById(toListId);

    if (!list) throw new Error("Target list not found");

    const exists = list.items.some((item) => item.tmdbId === tmdbId);
    if (exists) throw new Error("Item already exists in list");

    const result = await List.updateOne(
      { _id: fromListId },
      { $pull: { items: { tmdbId } } },
    );

    if (result.modifiedCount < 1) {
      throw new Error("List not found");
    }

    list.items.push(item);
    await list.save();

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const deleteFromList = async ({
  tmdbId,
  listId,
}: {
  tmdbId: number;
  listId: string;
}): Promise<ActionResponse> => {
  const { session } = await validateRequest();
  if (!session) redirect("/sign-in");

  try {
    await connectDB();

    const result = await List.updateOne(
      { _id: listId },
      { $pull: { items: { tmdbId } } },
    );

    if (result.modifiedCount < 1) {
      throw new Error("List not found");
    }
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const updateList = async ({
  description,
  isPrivate,
  listId,
  name,
}: FormSchema & { listId: string }): Promise<ActionResponse> => {
  const { session } = await validateRequest();
  if (!session) redirect("/sign-in");

  try {
    await connectDB();
    const exists = await List.exists({ name, _id: { $ne: listId } });
    if (exists) throw new Error("List already exists");
    const updatedList = await List.findByIdAndUpdate(
      listId,
      {
        name,
        description,
        isPrivate,
      },
      { new: true },
    );
    if (!updatedList) throw new Error("List not found");

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const deleteList = async (listId: string): Promise<ActionResponse> => {
  const { session } = await validateRequest();
  if (!session) redirect("/sign-in");
  try {
    await connectDB();
    const deletedList = await List.findOneAndDelete({ _id: listId });
    if (!deletedList) throw new Error("List not found");
    revalidatePath("/", "layout");
    redirect("/my-lists");
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};
