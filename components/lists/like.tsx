"use client";

import { ListWithUserAndLikes } from "@/types/mongodb";
import { TailwindSpinner } from "../ui/spinner";
import { Heart } from "lucide-react";
import { useSession } from "@/providers/session";
import { useMemo } from "react";
import useMessage from "@/hooks/message";
import { getQueryClient } from "@/providers/query";
import { useMutation } from "@tanstack/react-query";
import { likeList, unlikeList } from "@/server/mutations/like";
import { cn } from "@/lib/utils";

const LikeButton = ({ list }: { list: ListWithUserAndLikes }) => {
  const { session } = useSession();

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
  );
};
export default LikeButton;
