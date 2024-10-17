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
import { List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { listOptions } from "@/lib/queries";
import { Fragment, memo } from "react";
import { TailwindSpinner } from "../ui/spinner";
import { addToList } from "@/server/mutations/list";
import useMessage from "@/hooks/message";
import { getQueryClient } from "@/providers/query";
import {
  DROPDOWN_CONTENT_STYLE,
  DROPDOWN_ITEM_STYLE,
  DROPDOWN_TRIGGER_STYLE,
} from "@/lib/constants";

const ListButton = memo(
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
        <DropdownMenuTrigger asChild className={cn(DROPDOWN_TRIGGER_STYLE)}>
          <Button
            variant="ghost"
            className={cn(
              "flex w-full items-center justify-center gap-2 bg-primary-blue hover:bg-blue-900 hover:text-gray-50",
            )}
          >
            {mutation.isPending ? (
              <TailwindSpinner />
            ) : (
              <Fragment>
                <List width={20} /> Add to list
              </Fragment>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={cn(DROPDOWN_CONTENT_STYLE)}>
          <DropdownMenuLabel>Add to list</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isPending && (
            <DropdownMenuItem
              className={cn(
                DROPDOWN_ITEM_STYLE,
                "flex items-center justify-center",
              )}
            >
              <TailwindSpinner />
            </DropdownMenuItem>
          )}
          {isError && (
            <DropdownMenuItem
              className={cn(DROPDOWN_ITEM_STYLE, "text-red-600")}
            >
              Something went wrong
            </DropdownMenuItem>
          )}
          {data?.map((list) => (
            <DropdownMenuItem
              key={list._id}
              disabled={mutation.isPending}
              className={cn(DROPDOWN_ITEM_STYLE, "cursor-pointer")}
              onClick={() => mutation.mutate(list._id)}
            >
              {list.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

ListButton.displayName = "ListButton";
export default ListButton;
