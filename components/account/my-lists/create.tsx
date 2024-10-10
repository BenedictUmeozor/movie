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
import { Lock, Plus } from "lucide-react";
import { z } from "zod";
import { listSchema } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import useMessage from "@/hooks/message";
import { useMutation } from "@tanstack/react-query";
import { createList } from "@/server/mutations/list";
import { TailwindSpinner } from "@/components/ui/spinner";

type FormSchema = z.infer<typeof listSchema>;

const CreateList = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(listSchema),
    defaultValues: {
      name: "",
      description: "",
      isPrivate: false,
    },
  });

  const { alertMessage } = useMessage();

  const mutation = useMutation({
    mutationKey: ["create-list"],
    mutationFn: async (values: FormSchema) => {
      const { success, error } = await createList(values);
      if (error) throw new Error(error);
      return success;
    },
    onSuccess: () => {
      form.reset();
      setOpen(false);
      alertMessage("List created", "success");
    },
    onError: (error) => {
      alertMessage(error.message, "error");
    },
  });

  const onSubmit = (values: FormSchema) => {
    mutation.mutate(values);
  };

  return (
    <header className="mt-12 flex items-center justify-between">
      <h2 className="text-4xl font-bold max-lg:text-3xl max-md:text-2xl">
        My Lists
      </h2>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={cn(
              "flex items-center gap-2 bg-primary-blue text-white hover:bg-blue-900",
            )}
          >
            <Plus size={20} /> Create List
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[425px] bg-medium-gray text-medium-white">
          <DialogHeader>
            <DialogTitle className="text-white">Create new list</DialogTitle>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
                          className={cn(
                            "h-11 text-white focus-visible:ring-primary-blue",
                          )}
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="List description"
                          rows={8}
                          className={cn(
                            "h-11 resize-none text-white focus-visible:ring-primary-blue",
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
                <div className="flex items-center justify-end">
                  <Button
                    disabled={mutation.isPending}
                    className={cn("bg-primary-blue hover:bg-blue-900")}
                  >
                    {mutation.isPending ? <TailwindSpinner /> : "Create"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};
export default CreateList;
