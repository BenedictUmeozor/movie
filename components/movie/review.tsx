"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { ReviewWithUserAndLikes } from "@/types/mongodb";
import { formatDate } from "@/lib/utils";

const Review = ({ review }: { review: ReviewWithUserAndLikes }) => {
  return (
    <div className="space-y-3">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="text-black">
              {review.user.fullName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p>{review.user.username}</p>
        </div>
        <span className="text-medium-white">
          {formatDate(review.createdAt)}
        </span>
      </header>
      <div className="space-y-2">
        <p className="font-medium">{review.title}</p>
        <p className="text-medium-white">{review.body}</p>
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
