"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReviewWithUserAndLikes } from "@/types/mongodb";
import { formatDate } from "@/lib/utils";
import LikeButton from "../shared/review/like";
import { Fragment } from "react";
import EditReview from "../shared/review/edit";
import { Rating } from "@mui/material";
import DeleteReview from "../shared/review/delete";

const Review = ({
  review,
  isUserReview,
}: {
  review: ReviewWithUserAndLikes;
  isUserReview?: boolean;
}) => {
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
        <Rating value={review.rating} readOnly />
        <p className="font-medium">{review.title}</p>
        <p className="text-medium-white">{review.body}</p>
        <div className="flex items-center gap-1">
          <LikeButton review={review} />
          {isUserReview && (
            <Fragment>
              <EditReview review={review} />
              <DeleteReview reviewId={review._id} />
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
export default Review;
