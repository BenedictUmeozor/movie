"use client";

import { TailwindSpinner } from "@/components/ui/spinner";
import { Heart } from "lucide-react";
import { useSession } from "@/providers/session";
import { useMemo } from "react";
import useMessage from "@/hooks/message";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { ReviewWithUserAndLikes } from "@/types/mongodb";
import { likeReview, unlikeReview } from "@/server/mutations/like";

const LikeButton = ({ review }: { review: ReviewWithUserAndLikes }) => {
  const { session } = useSession();

  const userLikedIt = useMemo(() => {
    if (!session) return false;

    return review.likes.some((like) => like.user === session.userId);
  }, [session, review]);

  const { alertMessage } = useMessage();

  const mutation = useMutation({
    mutationKey: ["like-review", review._id],
    mutationFn: async () => {
      if (!session) throw new Error("You need to be logged in");
      if (userLikedIt) {
        const { success, error } = await unlikeReview({ reviewId: review._id });
        if (error) throw new Error(error);
        return success;
      } else {
        const { success, error } = await likeReview({ reviewId: review._id });
        if (error) throw new Error(error);
        return success;
      }
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
        {review.likes.length} {review.likes.length === 1 ? "like" : "likes"}
      </span>
    </div>
  );
};
export default LikeButton;
