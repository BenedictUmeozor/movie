"use client";

import Link from "next/link";
import CopyButton from "../shared/copy-button";
import StackedGallery from "../shared/list-image-gallery";
import { ListWithUserAndLikes } from "@/types/mongodb";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import LikeButton from "./like";

const CommunityList = ({ list }: { list: ListWithUserAndLikes }) => {
  const listImages = list.items.map((item) => item.posterPath);

  return (
    <div className="block space-y-2 rounded p-2 hover:bg-light-gray max-md:mx-auto max-md:w-[90%] max-md:max-w-md">
      <Link href={`/lists/${list._id}`} className="block">
        <StackedGallery images={listImages.slice(0, 4)} />
      </Link>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className={cn("bg-gray-500")}>
              {list.user.fullName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{list.user.username}</span>
        </div>
        <div className="flex items-center justify-between">
          <p>{list.name}</p>
          <CopyButton />
        </div>
        <p className="text-sm text-medium-white">{list.description}</p>
        <div className="flex items-center justify-between text-sm text-medium-white">
          <span>{list.items.length} titles</span>
          <LikeButton list={list} />
        </div>
      </div>
    </div>
  );
};

export default CommunityList;
