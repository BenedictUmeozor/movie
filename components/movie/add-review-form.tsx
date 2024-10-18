"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating } from "@mui/material";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { useSession } from "@/providers/session";
import { z } from "zod";
import { reviewSchema } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useMutation } from "@tanstack/react-query";
import { createReview } from "@/server/mutations/reviews";
import useMessage from "@/hooks/message";
import { TailwindSpinner } from "../ui/spinner";

type FormSchema = z.infer<typeof reviewSchema>;

const AddReviewForm = ({ tmdbId }: { tmdbId: number }) => {
  const { user } = useSession();

  const form = useForm<FormSchema>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 1,
      title: "",
      body: "",
    },
  });

  const { alertMessage } = useMessage();

  const mutation = useMutation({
    mutationKey: ["add-review", tmdbId],
    mutationFn: async (data: FormSchema) => {
      const { success, error } = await createReview({
        ...data,
        tmdbId,
        mediaType: "movie",
      });
      if (error) throw new Error(error);
      return success;
    },
    onSuccess: () => {
      form.reset();
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
    <div className="mt-8 items-start gap-4 max-lg:space-y-4 lg:flex">
      <div className="grid w-12 place-items-center">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback className="text-black">
            {user?.fullName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
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
                  <FormLabel>Your rating</FormLabel>
                  <FormControl>
                    <Rating
                      value={field.value}
                      icon={<Star fill="#FFD700" size={20} stroke="#FFD700" />}
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
                <FormLabel>Title</FormLabel>
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
                <FormLabel>Body</FormLabel>
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

          <div className="flex items-center justify-end gap-4">
            <Button
              variant={"ghost"}
              type="reset"
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
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
    </div>
  );
};
export default AddReviewForm;
