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

type FormSchema = z.infer<typeof listSchema>;

const CreateList = () => {
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
    <header className="mt-12 flex items-center justify-between">
      <h2 className="text-4xl font-bold max-lg:text-3xl max-md:text-2xl">
        My Lists
      </h2>
      <Dialog>
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
                <div className="flex items-center justify-end">
                  <Button className={cn("bg-primary-blue hover:bg-blue-900")}>
                    Create
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
