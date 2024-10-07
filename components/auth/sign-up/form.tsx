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
import { Separator } from "@/components/ui/separator";
import GoogleButton from "../shared/google-button";
import Link from "next/link";

type FormSchema = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (values: FormSchema) => {
    console.log(values);
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
            Submit
          </Button>
        </form>
        <div className="flex items-center justify-center gap-4 overflow-hidden">
          <Separator />
          <span className="text-sm font-bold text-medium-white">OR</span>
          <Separator />
        </div>
        <GoogleButton />
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
