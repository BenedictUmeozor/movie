"use client";

import googleLogo from "@/assets/7123025_logo_google_g_icon.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const GoogleButton = () => {
  return (
    <div>
      <Button
        variant={"outline"}
        className={cn(
          "flex h-12 w-full items-center gap-3 border-primary-blue bg-transparent text-primary-blue hover:bg-primary-blue hover:text-medium-white",
        )}
      >
        Continue with Google
        <Image
          src={googleLogo}
          alt="Google"
          width={50}
          height={50}
          className="w-6"
        />
      </Button>
    </div>
  );
};
export default GoogleButton;
