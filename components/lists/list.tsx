"use client";

import Link from "next/link";
import CopyButton from "../shared/copy-button";
import StackedGallery from "../shared/list-image-gallery";
import { ListWithUserAndLikes } from "@/types/mongodb";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useSession } from "@/providers/session";
import { useMutation } from "@tanstack/react-query";
import { likeList, unlikeList } from "@/server/mutations/like";
import useMessage from "@/hooks/message";
import { TailwindSpinner } from "../ui/spinner";
import { useMemo } from "react";
import { getQueryClient } from "@/providers/query";

const CommunityList = ({ list }: { list: ListWithUserAndLikes }) => {
  const listImages = list.items.map((item) => item.posterPath);

  const { session } = useSession();

  console.log(list);

  const userLikedIt = useMemo(() => {
    if (!session) return false;

    return list.likes.some((like) => like.user === session.userId);
  }, [session, list]);

  const { alertMessage } = useMessage();
  const queryClient = getQueryClient();

  const mutation = useMutation({
    mutationKey: ["like-list", list._id],
    mutationFn: async () => {
      if (!session) throw new Error("You need to be logged in");
      if (userLikedIt) {
        const { success, error } = await unlikeList({ listId: list._id });
        if (error) throw new Error(error);
        return success;
      } else {
        const { success, error } = await likeList({ listId: list._id });
        if (error) throw new Error(error);
        return success;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-liked-list", list._id],
      });
      queryClient.refetchQueries({ queryKey: ["user-liked-list", list._id] });
    },
    onError: (error) => {
      alertMessage(error.message, "error");
    },
  });

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
          <div className="flex items-center gap-2 text-medium-white">
            {mutation.isPending ? (
              <TailwindSpinner />
            ) : (
              <Heart
                width={20}
                className={cn("cursor-pointer", {
                  "fill-primary-blue stroke-primary-blue": userLikedIt,
                })}
                onClick={() => mutation.mutate()}
              />
            )}
            <span>
              {list.likes.length} {list.likes.length === 1 ? "like" : "likes"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityList;
