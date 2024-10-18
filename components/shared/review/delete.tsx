"use client";

import { Button } from "@/components/ui/button";
import { TailwindSpinner } from "@/components/ui/spinner";
import useMessage from "@/hooks/message";
import { deleteReview } from "@/server/mutations/reviews";
import { useMutation } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const { alertMessage } = useMessage();

  const mutation = useMutation({
    mutationKey: ["delete-review", reviewId],
    mutationFn: async () => {
      const { success, error } = await deleteReview(reviewId);
      if (error) throw new Error(error);
      return success;
    },
    onSuccess: () => {
      alertMessage("Review deleted", "success");
    },
    onError: (error) => {
      alertMessage(error.message, "error");
    },
  });

  return (
    <Button
      size={"icon"}
      variant={"destructive"}
      disabled={mutation.isPending}
      onClick={() => mutation.mutate()}
    >
      {mutation.isPending ? <TailwindSpinner /> : <TrashIcon width={16} />}
    </Button>
  );
};
export default DeleteReview;
