"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import GoogleButton from "../shared/google-button";
import Link from "next/link";
import useMessage from "@/hooks/message";
import { useMutation } from "@tanstack/react-query";
import { signin } from "@/server/mutations/auth";
import { useRouter } from "nextjs-toploader/app";
import { TailwindSpinner } from "@/components/ui/spinner";

type FormSchema = z.infer<typeof loginSchema>;

const SigninForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { alertMessage } = useMessage();
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (values: FormSchema) => {
      const { success, error } = await signin(values);
      if (error) throw new Error(error);
      return success;
    },
    onSuccess: () => {
      form.reset();
      alertMessage("Login successful", "success");
      router.replace("/");
    },
    onError: (error) => {
      alertMessage(error.message, "error");
    },
  });

  const onSubmit = (values: FormSchema) => {
    mutation.mutate(values);
  };

  return (
    <div className="w-full space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-medium-white">
                  Email address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="johndoe@example.com"
                    className={cn("h-11 focus-visible:ring-primary-blue")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-medium-white">Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="********"
                    className={cn("h-11 focus-visible:ring-primary-blue")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="default"
            className={cn(
              "h-12 w-full bg-primary-blue text-white hover:bg-blue-900",
            )}
          >
            {mutation.isPending ? <TailwindSpinner /> : "Submit"}
          </Button>
        </form>
        <div className="flex items-center justify-center gap-4 overflow-hidden">
          <Separator />
          <span className="text-sm font-bold text-medium-white">OR</span>
          <Separator />
        </div>
        <GoogleButton />
        <p className="text-center text-medium-white">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-primary-blue hover:underline">
            Sign up
          </Link>
        </p>
      </Form>
    </div>
  );
};
export default SigninForm;
