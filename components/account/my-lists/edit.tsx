"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Lock, SquarePen, Trash2 } from "lucide-react";
import { z } from "zod";
import { listSchema } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import useMessage from "@/hooks/message";
import { useMutation } from "@tanstack/react-query";
import { deleteList, updateList } from "@/server/mutations/list";
import { getQueryClient } from "@/providers/query";
import { TailwindSpinner } from "@/components/ui/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Fragment } from "react";
import { ListWithUser } from "@/types/mongodb";

type FormSchema = z.infer<typeof listSchema>;

const EditList = ({
  className = "",
  btnWidth = "",
  list,
}: {
  list: ListWithUser;
  className?: string;
  btnWidth?: string;
}) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(listSchema),
    defaultValues: {
      name: list.name,
      description: list.description,
      isPrivate: list.isPrivate,
    },
  });

  const { alertMessage } = useMessage();
  const queryClient = getQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["delete-list", list._id],
    mutationFn: async () => {
      const { success, error } = await deleteList(list._id);
      if (error) throw new Error(error);
      return success;
    },
    onSuccess: () => {
      alertMessage("List deleted", "success");
      queryClient.invalidateQueries({ queryKey: ["user-lists"] });
    },
    onError: (error) => {
      alertMessage(error.message, "error");
    },
  });

  const mutation = useMutation({
    mutationKey: ["update-list", list._id],
    mutationFn: async (values: FormSchema) => {
      const { success, error } = await updateList({
        listId: list._id,
        ...values,
      });
      if (error) throw new Error(error);
      return success;
    },
    onSuccess: () => {
      alertMessage("List updated", "success");
      queryClient.invalidateQueries({ queryKey: ["user-lists"] });
    },
    onError: (error) => {
      alertMessage(error.message, "error");
    },
  });

  const onSubmit = (values: FormSchema) => {
    mutation.mutate(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={list.isFavourite || list.isSaved}
          className={cn(
            `flex items-center gap-2 bg-primary-blue text-white hover:bg-blue-900 ${className} ${btnWidth}`,
          )}
        >
          <SquarePen size={20} /> Edit List
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`max-w-[425px] bg-medium-gray text-medium-white ${className}`}
      >
        <DialogHeader>
          <DialogTitle className="text-white">Create new list</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="My List"
                        className={cn("h-11 focus-visible:ring-primary-blue")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="List description"
                        rows={8}
                        className={cn(
                          "h-11 resize-none focus-visible:ring-primary-blue",
                        )}
                      ></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPrivate"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="flex items-center gap-2">
                        <Lock size={16} /> Private list
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className={cn(
                            "data-[state=checked]:bg-blue-900 data-[state=unchecked]:bg-primary-blue",
                          )}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      disabled={mutation.isPending || deleteMutation.isPending}
                      className={cn(
                        "flex flex-1 items-center gap-2 bg-red-900/50 text-red-700 hover:bg-red-900/70",
                      )}
                    >
                      {deleteMutation.isPending ? (
                        <TailwindSpinner />
                      ) : (
                        <Fragment>
                          <Trash2 size={20} /> Delete
                        </Fragment>
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent
                    className={cn("bg-medium-gray text-medium-white")}
                  >
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete &quot;{list.name}&quot;
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className={cn("bg-red-900/50")}
                        disabled={
                          mutation.isPending || deleteMutation.isPending
                        }
                        onClick={() => deleteMutation.mutate()}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button
                  type="submit"
                  disabled={mutation.isPending || deleteMutation.isPending}
                  className={cn("flex-1 bg-primary-blue hover:bg-blue-900")}
                >
                  {mutation.isPending ? <TailwindSpinner /> : "Save changes"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default EditList;
