"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { reviewSchema } from "@/lib/zod";
import { editReview } from "@/server/mutations/reviews";
import { ReviewWithUserAndLikes } from "@/types/mongodb";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TailwindSpinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Rating } from "@mui/material";
import { Star } from "lucide-react";
import useMessage from "@/hooks/message";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type FormSchema = z.infer<typeof reviewSchema>;

const EditReview = ({ review }: { review: ReviewWithUserAndLikes }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: review.rating,
      title: review.title,
      body: review.body,
    },
  });

  const { alertMessage } = useMessage();

  const mutation = useMutation({
    mutationKey: ["edit-review", review._id],
    mutationFn: async (data: FormSchema) => {
      const { success, error } = await editReview({
        reviewId: review._id,
        ...data,
      });
      if (error) throw new Error(error);
      return success;
    },
    onSuccess: () => {
      setOpen(false);
      alertMessage("Review created successfully", "success");
    },
    onError: (error) => {
      alertMessage(error.message, "error");
    },
  });

  const onSubmit = (values: FormSchema) => {
    mutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn("hover:bg-transparent hover:text-primary-blue")}
          disabled={mutation.isPending}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "w-[95%] max-w-lg rounded-lg bg-black p-6 text-white shadow-xl",
        )}
      >
        <DialogHeader>Edit Review</DialogHeader>
        <Form {...form}>
          <form
            className="flex-1 space-y-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel className="text-medium-white">
                      Your rating
                    </FormLabel>
                    <FormControl>
                      <Rating
                        value={field.value}
                        icon={
                          <Star fill="#FFD700" size={20} stroke="#FFD700" />
                        }
                        emptyIcon={<Star stroke="#bbb" size={20} />}
                        onChange={(_, value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-medium-white">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Headline of review" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-medium-white">Body</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Write your review here..."
                      className={cn("resize-none")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end">
              <Button
                variant={"default"}
                type="submit"
                disabled={mutation.isPending}
                className="bg-primary-blue hover:bg-primary-blue/80"
              >
                {mutation.isPending ? <TailwindSpinner /> : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default EditReview;
