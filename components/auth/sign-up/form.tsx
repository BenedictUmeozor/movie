"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { signupSchema } from "@/lib/zod";
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
// import { Separator } from "@/components/ui/separator";
// import GoogleButton from "../shared/google-button";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/server/mutations/auth";
import { useRouter } from "nextjs-toploader/app";
import useMessage from "@/hooks/message";
import { TailwindSpinner } from "@/components/ui/spinner";

type FormSchema = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      username: "",
    },
  });

  const router = useRouter();

  const { alertMessage } = useMessage();

  const mutation = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async (values: FormSchema) => {
      const { success, error } = await signup(values);
      if (error) throw new Error(error);
      return success;
    },
    onSuccess: () => {
      form.reset();
      alertMessage("Account created successfully", "success");
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
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-medium-white">Full name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    className={cn("h-11 focus-visible:ring-primary-blue")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-medium-white">Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="johndoe123"
                    className={cn("h-11 focus-visible:ring-primary-blue")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            disabled={mutation.isPending}
            className={cn(
              "h-12 w-full bg-primary-blue text-white hover:bg-blue-900",
            )}
          >
            {mutation.isPending ? <TailwindSpinner /> : "Submit"}
          </Button>
        </form>
        {/* <div className="flex items-center justify-center gap-4 overflow-hidden">
          <Separator />
          <span className="text-sm font-bold text-medium-white">OR</span>
          <Separator />
        </div>
        <GoogleButton /> */}
        <p className="text-center text-medium-white">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary-blue hover:underline">
            Sign in
          </Link>
        </p>
      </Form>
    </div>
  );
};
export default SignupForm;
