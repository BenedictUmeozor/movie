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

const AccountDropdown = () => {
  const [open, setOpen] = useState(false);

  const { alertMessage } = useMessage();

  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await signout();
      return response;
    },
    onSuccess: () => {
      setOpen(false);
    },
    onError: (error) => {
      console.log(error);
      alertMessage(error.message || "something went wrong", "error");
    },
  });

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer max-md:hidden">
          <AvatarImage src="" />
          <AvatarFallback className="text-black">BU</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-8 w-56 max-md:hidden">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={"/my-lists"}>My lists</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => mutation.mutate()}
        >
          {mutation.isPending ? <TailwindSpinner /> : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AccountDropdown;
