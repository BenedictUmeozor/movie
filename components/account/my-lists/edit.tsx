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

type FormSchema = z.infer<typeof listSchema>;

const EditList = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(listSchema),
    defaultValues: {
      name: "",
      description: "",
      private: false,
    },
  });

  const onSubmit = (values: FormSchema) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "flex items-center gap-2 bg-primary-blue text-white hover:bg-blue-900",
          )}
        >
          <SquarePen size={20} /> Edit List
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] bg-medium-gray text-medium-white">
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
                name="private"
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
                <Button
                  type="button"
                  className={cn(
                    "flex flex-1 items-center gap-2 bg-red-900/50 text-red-700 hover:bg-red-900/70",
                  )}
                >
                  <Trash2 size={20} /> Delete
                </Button>
                <Button
                  type="submit"
                  className={cn("flex-1 bg-primary-blue hover:bg-blue-900")}
                >
                  Save changes
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
