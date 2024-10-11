"use client";

import CopyButton from "@/components/shared/copy-button";
import StackedGallery from "@/components/shared/list-image-gallery";
import { IList } from "@/lib/models/list";
import { Star, Globe, Lock, Bookmark } from "lucide-react";
import Link from "next/link";

export const List = ({ list }: { list: IList }) => {
  const listImages = list.items.map((item) => item.posterPath);

  return (
    <Link
      href={`/my-lists/${list._id}`}
      className="block space-y-2 rounded p-2 hover:bg-light-gray max-md:mx-auto max-md:w-[90%] max-md:max-w-md"
    >
      <StackedGallery images={listImages.slice(0, 4)} />
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
    </Link>
  );
};

export const Saved = ({ list }: { list: IList }) => {
  return (
    <Link
      href={`/my-lists/${list._id}`}
      className="block space-y-2 rounded p-2 hover:bg-light-gray max-md:mx-auto max-md:w-[90%] max-md:max-w-md"
    >
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
    </Link>
  );
};

export const Favorites = ({ list }: { list: IList }) => {
  return (
    <Link
      href={`/my-lists/${list._id}`}
      className="block space-y-2 rounded p-2 hover:bg-light-gray max-md:mx-auto max-md:w-[90%] max-md:max-w-md"
    >
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
    </Link>
  );
};

export const PrivateOrPublic = ({ isPrivate }: { isPrivate: boolean }) => {
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
