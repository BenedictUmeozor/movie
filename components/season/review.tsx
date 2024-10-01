"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";

const Review = () => {
  return (
    <div className="space-y-3">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="text-black">BU</AvatarFallback>
          </Avatar>
          <p>Benedict Umeozor</p>
        </div>
        <span className="text-medium-white">Jan 7, 2024</span>
      </header>
      <div className="space-y-2">
        <p className="font-medium">Best movie ever</p>
        <p className="text-medium-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero autem
          minima dolore, beatae minus optio quo velit ipsa aperiam sint quia
          maiores inventore quos asperiores eum nam ducimus recusandae
          obcaecati!
        </p>
        <div className="flex items-center gap-1">
          <Button size={"icon"} variant={"ghost"}>
            <Heart size={20} />
          </Button>
          <span className="text-sm text-medium-white">24 likes</span>
        </div>
      </div>
    </div>
  );
};
export default Review;
