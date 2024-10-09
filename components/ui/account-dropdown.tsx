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
import Link from "next/link";

const AccountDropdown = () => {
  return (
    <DropdownMenu>
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
        <DropdownMenuItem className="cursor-pointer">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AccountDropdown;
