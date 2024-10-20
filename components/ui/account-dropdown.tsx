"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useMessage from "@/hooks/message";
import { signout } from "@/server/mutations/auth";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { TailwindSpinner } from "./spinner";
import { cn } from "@/lib/utils";
import {
  DROPDOWN_CONTENT_STYLE,
  DROPDOWN_ITEM_STYLE,
  DROPDOWN_SEPARATOR_STYLE,
} from "@/lib/constants";
import { useSession } from "@/providers/session";

const AccountDropdown = () => {
  const [open, setOpen] = useState(false);

  const { user } = useSession();

  const { alertMessage } = useMessage();

  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const { success, error } = await signout();
      if (error) throw new Error(error);
      return success;
    },
    onSuccess: () => {
      alertMessage("You are logged out", "success");
      setOpen(false);
    },
    onError: (error) => {
      console.log(error);
      alertMessage(error.message, "error");
    },
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer max-md:hidden">
          <AvatarImage src="" />
          <AvatarFallback className={cn("text-black")}>
            {user?.fullName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={cn(DROPDOWN_CONTENT_STYLE, "mr-8")}>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator className={cn(DROPDOWN_SEPARATOR_STYLE)} />
        <DropdownMenuItem
          asChild
          className={cn(DROPDOWN_ITEM_STYLE, "cursor-pointer")}
        >
          <Link href={"/my-lists"}>My lists</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(DROPDOWN_ITEM_STYLE, "cursor-pointer")}
          onClick={() => mutation.mutate()}
        >
          {mutation.isPending ? <TailwindSpinner /> : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AccountDropdown;
