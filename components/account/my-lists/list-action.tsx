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
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  COMMAND_GROUP_STYLE,
  COMMAND_ITEM_STYLE,
  COMMAND_STYLE,
  DROPDOWN_CONTENT_STYLE,
  DROPDOWN_TRIGGER_STYLE,
} from "@/lib/constants";
import { listOptions } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { LayoutList } from "lucide-react";

const ListAction = () => {
  const { data } = useQuery(listOptions());
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(DROPDOWN_TRIGGER_STYLE)} asChild>
        <Button variant="ghost" size="icon">
          <LayoutList width={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn(DROPDOWN_CONTENT_STYLE)}>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator className={cn("bg-neutral-800")} />
        <DropdownMenuGroup>
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
                    {data?.map((list) => (
                      <CommandItem
                        key={list._id}
                        value={list._id}
                        onSelect={() => console.log(list)}
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
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ListAction;
