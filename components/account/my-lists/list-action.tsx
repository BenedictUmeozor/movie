"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TailwindSpinner } from "@/components/ui/spinner";
import useMessage from "@/hooks/message";
import {
  COMMAND_GROUP_STYLE,
  COMMAND_ITEM_STYLE,
  COMMAND_STYLE,
  DROPDOWN_CONTENT_STYLE,
  DROPDOWN_ITEM_STYLE,
  DROPDOWN_SEPARATOR_STYLE,
  DROPDOWN_TRIGGER_STYLE,
} from "@/lib/constants";
import { IListItem } from "@/lib/models/list";
import { listOptions } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { addToList, changeList, deleteFromList } from "@/server/mutations/list";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LayoutList } from "lucide-react";
import { useMemo } from "react";

const ListAction = ({
  item: { mediaType, posterPath, title, tmdbId },
  listId,
}: {
  item: IListItem;
  listId: string;
}) => {
  const { data } = useQuery(listOptions());

  const lists = useMemo(
    () => data?.filter((list) => list._id !== listId),
    [data, listId],
  );

  const { alertMessage } = useMessage();

  const changeListMutation = useMutation({
    mutationKey: ["change-list", listId],
    mutationFn: async (toListId: string) => {
      const { success, error } = await changeList({
        fromListId: listId,
        toListId,
        mediaType,
        posterPath,
        title,
        tmdbId,
      });
      if (error) throw new Error(error);
      return success;
    },
    onSuccess: () => {
      alertMessage("Moved to list", "success");
    },
    onError: (error) => {
      alertMessage(error.message, "error");
    },
  });

  const copyToListMutation = useMutation({
    mutationKey: ["copy-to-list", tmdbId],
    mutationFn: async (list_id: string) => {
      const { success, error } = await addToList({
        mediaType,
        posterPath,
        title,
        tmdbId,
        listId: list_id,
      });
      if (error) throw new Error(error);
      return success;
    },
    onSuccess: () => {
      alertMessage("Copied to list", "success");
    },
    onError: (error) => {
      alertMessage(error.message, "error");
    },
  });

  const deleteMutation = useMutation({
    mutationKey: ["delete-list", listId],
    mutationFn: async () => {
      const { success, error } = await deleteFromList({
        tmdbId,
        listId,
      });
      if (error) throw new Error(error);
      return success;
    },
    onSuccess: () => {
      alertMessage("Removed from list", "success");
    },
    onError: (error) => {
      alertMessage(error.message, "error");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(DROPDOWN_TRIGGER_STYLE)} asChild>
        <Button variant="ghost" size="icon">
          {changeListMutation.isPending ||
          copyToListMutation.isPending ||
          deleteMutation.isPending ? (
            <TailwindSpinner />
          ) : (
            <LayoutList width={20} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn(DROPDOWN_CONTENT_STYLE)}>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator className={cn(DROPDOWN_SEPARATOR_STYLE)} />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            className={cn(
              "focus:bg-neutral-800 data-[state=open]:bg-neutral-800",
            )}
          >
            Change list
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className={cn(DROPDOWN_CONTENT_STYLE)}>
            <Command className={cn(COMMAND_STYLE)}>
              <CommandList>
                <CommandGroup className={cn(COMMAND_GROUP_STYLE)}>
                  {lists?.map((list) => (
                    <CommandItem
                      key={list._id}
                      value={list._id}
                      onSelect={() => changeListMutation.mutate(list._id)}
                      className={cn(COMMAND_ITEM_STYLE)}
                      disabled={
                        copyToListMutation.isPending ||
                        changeListMutation.isPending ||
                        deleteMutation.isPending
                      }
                    >
                      {list.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            className={cn(
              "focus:bg-neutral-800 data-[state=open]:bg-neutral-800",
            )}
          >
            Copy to another list
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className={cn(DROPDOWN_CONTENT_STYLE)}>
            <Command className={cn(COMMAND_STYLE)}>
              <CommandList>
                <CommandGroup className={cn(COMMAND_GROUP_STYLE)}>
                  {lists?.map((list) => (
                    <CommandItem
                      key={list._id}
                      value={list._id}
                      onSelect={() => copyToListMutation.mutate(list._id)}
                      disabled={
                        copyToListMutation.isPending ||
                        changeListMutation.isPending ||
                        deleteMutation.isPending
                      }
                      className={cn(COMMAND_ITEM_STYLE)}
                    >
                      {list.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator className={cn(DROPDOWN_SEPARATOR_STYLE)} />
        <DropdownMenuItem
          className={cn(DROPDOWN_ITEM_STYLE, "text-red-600")}
          disabled={
            copyToListMutation.isPending ||
            changeListMutation.isPending ||
            deleteMutation.isPending
          }
          onClick={() => deleteMutation.mutate()}
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ListAction;
