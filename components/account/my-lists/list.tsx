"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IList } from "@/lib/models/list";
import { cn } from "@/lib/utils";
import { Share2, Star, Globe, Lock, Bookmark } from "lucide-react";
import Image from "next/image";

export const List = ({ list }: { list: IList }) => {
  const listImages = list.items.map((item) => item.posterPath);

  return (
    <div className="space-y-2 rounded p-2 hover:bg-light-gray max-md:w-[80%] max-md:max-w-xs">
      <StackedGallery images={listImages} />
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p>{list.name}</p>
          <CopyButton />
        </div>
        <div className="flex items-center gap-2 text-sm text-medium-white">
          <span>{list.items.length} titles</span>
          <PrivateOrPublic isPrivate={list.isPrivate} />
        </div>
      </div>
    </div>
  );
};

export const Saved = ({ list }: { list: IList }) => {
  return (
    <div className="space-y-2 rounded p-2 hover:bg-light-gray max-md:w-[80%] max-md:max-w-xs">
      <div className="flex aspect-[6/2.5] items-center justify-center rounded-md bg-pink-500">
        <div className="inline-flex items-center gap-2 text-lg font-medium">
          <Bookmark size={20} fill="white" /> Saved
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p>Saved</p>
          <CopyButton />
        </div>
        <div className="flex items-center gap-2 text-sm text-medium-white">
          <span>{list.items.length} titles</span>
          <PrivateOrPublic isPrivate={list.isPrivate} />
        </div>
      </div>
    </div>
  );
};

export const Favorites = ({ list }: { list: IList }) => {
  return (
    <div className="space-y-2 rounded p-2 hover:bg-light-gray max-md:w-[80%] max-md:max-w-xs">
      <div className="flex aspect-[6/2.5] items-center justify-center rounded-md bg-blue-500">
        <div className="inline-flex items-center gap-2 text-lg font-medium">
          <Star size={20} fill="white" /> Favourites
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <p>Favourites</p>
          <CopyButton />
        </div>
        <div className="flex items-center gap-2 text-sm text-medium-white">
          <span>{list.items.length} titles</span>
          <PrivateOrPublic isPrivate={list.isPrivate} />
        </div>
      </div>
    </div>
  );
};

const PrivateOrPublic = ({ isPrivate }: { isPrivate: boolean }) => {
  if (isPrivate) {
    return (
      <span className="inline-flex items-center gap-1">
        <Lock size={16} />
        Private
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1">
      <Globe size={16} />
      Public
    </span>
  );
};

const CopyButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <Share2 size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy link</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const StackedGallery = ({ images }: { images: string[] }) => {
  const totalImages = images.length;
  const maxOffset = 32; // maximum offset in pixels
  const maxRotation = 5; // maximum rotation in degrees

  return (
    <div
      className={cn(
        "flex aspect-[6/2.5] items-center justify-center overflow-hidden rounded-md",
        {
          "bg-medium-gray": !!totalImages,
          "bg-medium-white": totalImages === 0,
        },
      )}
    >
      {images.map((image, index) => {
        const offset = (index / (totalImages - 1)) * maxOffset;
        const rotation = ((index / (totalImages - 1)) * 2 - 1) * maxRotation;
        const zIndex = totalImages - index;

        return (
          <div
            key={`image-${index}`}
            className="w-44"
            style={{
              top: `${offset}px`,
              left: `${offset}px`,
              zIndex: zIndex,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <Image
              src={process.env.NEXT_PUBLIC_IMG_URL + image}
              alt={`Image ${index + 1}`}
              height={400}
              width={400}
              className="aspect-[5/6] w-full object-cover"
            />
          </div>
        );
      })}
    </div>
  );
};
