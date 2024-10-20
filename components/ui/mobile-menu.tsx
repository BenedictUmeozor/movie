"use client";

import { Menu, ChevronRight, LogInIcon } from "lucide-react";
import { Button } from "./button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useSession } from "@/providers/session";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import useMessage from "@/hooks/message";
import { useMutation } from "@tanstack/react-query";
import { signout } from "@/server/mutations/auth";
import { TailwindSpinner } from "./spinner";
import { ListIcon, UserIcon, LogOutIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSession();

  const pathname = usePathname();

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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="lg:hidden">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className={cn(
          "w-[300px] space-y-6 ring-offset-neutral-950 focus:ring-neutral-300 data-[state=open]:bg-neutral-800",
        )}
      >
        <SheetHeader className="border-b border-neutral-700 pb-4">
          {!!user && (
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={""} />
                <AvatarFallback
                  className={cn("text-lg font-semibold text-black")}
                >
                  {user.fullName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left">
                <span className="font-semibold">{user.fullName}</span>
                <span className="text-sm text-neutral-400">{user.email}</span>
              </div>
            </div>
          )}
        </SheetHeader>
        <nav>
          <ul className="space-y-3">
            <MenuItem href="/lists" icon={<ListIcon size={18} />}>
              Community lists
            </MenuItem>
            {!user && (
              <MenuItem href="/sign-in" icon={<LogInIcon size={18} />}>
                Sign in
              </MenuItem>
            )}
            {!!user && (
              <>
                <MenuItem href="/my-lists" icon={<UserIcon size={18} />}>
                  My lists
                </MenuItem>
                <MenuItem
                  as="button"
                  onClick={() => mutation.mutate()}
                  icon={
                    mutation.isPending ? (
                      <TailwindSpinner />
                    ) : (
                      <LogOutIcon size={18} />
                    )
                  }
                >
                  Logout
                </MenuItem>
              </>
            )}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const MenuItem = ({
  children,
  href,
  icon,
  as = "link",
  onClick,
}: {
  children: ReactNode;
  href?: string;
  icon?: ReactNode;
  as?: "link" | "button";
  onClick?: () => void;
}) => {
  if (as === "link" && !!href) {
    return (
      <li>
        <Link
          href={href}
          onClick={onClick}
          className="flex w-full items-center justify-between rounded-md p-3 text-medium-white transition-colors hover:bg-neutral-700 hover:text-primary-blue"
        >
          <div className="flex items-center gap-3">
            {icon}
            <span className="text-sm font-medium">{children}</span>
          </div>
          <ChevronRight size={16} />
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between rounded-md p-3 text-medium-white transition-colors hover:bg-neutral-700 hover:text-primary-blue"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-sm font-medium">{children}</span>
        </div>
        <ChevronRight size={16} />
      </button>
    </li>
  );
};

export default MobileMenu;
