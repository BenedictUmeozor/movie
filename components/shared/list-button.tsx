"use client";

import { IListItem } from "@/lib/models/list";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { listOptions } from "@/lib/queries";
import { memo } from "react";
import { TailwindSpinner } from "../ui/spinner";
import { addToList } from "@/server/mutations/list";
import useMessage from "@/hooks/message";
import { getQueryClient } from "@/providers/query";

const AddToListButton = memo(
  ({ mediaType, posterPath, title, tmdbId }: IListItem) => {
    const { data, isPending, isError } = useQuery(listOptions());

    const { alertMessage } = useMessage();
    const queryClient = getQueryClient();

    const mutation = useMutation({
      mutationKey: ["add-to-list", tmdbId],
      mutationFn: async (listId: string) => {
        const { success, error } = await addToList({
          mediaType,
          posterPath,
          title,
          tmdbId,
          listId,
        });
        if (error) throw new Error(error);
        return success;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-lists"] });
        alertMessage("Added to list", "success");
      },
      onError: (error) => {
        alertMessage(error.message, "error");
      },
    });

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <LayoutList size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={cn("w-56")}>
          <DropdownMenuLabel>Add to list</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isPending && (
            <DropdownMenuItem className="flex items-center justify-center">
              <TailwindSpinner />
            </DropdownMenuItem>
          )}
          {isError && (
            <DropdownMenuItem className="text-red-600">
              Something went wrong
            </DropdownMenuItem>
          )}
          {data?.map((list) => (
            <DropdownMenuItem
              key={list._id}
              disabled={mutation.isPending}
              className="cursor-pointer"
              onClick={() => mutation.mutate(list._id)}
            >
              {mutation.isPending ? <TailwindSpinner /> : list.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

AddToListButton.displayName = "AddToListButton";
export default AddToListButton;
