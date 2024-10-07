"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bookmark, Globe, Lock, Share2, Star } from "lucide-react";

export const FavouritesList = () => {
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
        </div>
        <div className="flex items-center gap-2 text-sm text-medium-white">
          <span>103 titles</span>
          <span className="inline-flex items-center gap-1">
            <Globe size={16} />
            Public
          </span>
        </div>
      </div>
    </div>
  );
};

export const SavedList = () => {
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
        </div>
        <div className="flex items-center gap-2 text-sm text-medium-white">
          <span>23 titles</span>
          <span className="inline-flex items-center gap-1">
            <Lock size={16} />
            Private
          </span>
        </div>
      </div>
    </div>
  );
};
