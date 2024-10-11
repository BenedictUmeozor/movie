"use server";

import connectDB from "@/lib/db";
import User from "@/lib/models/user";
import { loginSchema, signupSchema } from "@/lib/zod";
import { generateTimeBasedId } from "@/utils/functions";
import { z } from "zod";
import { Argon2id } from "oslo/password";
import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ActionResponse } from "@/types/globals";

type SignupSchema = z.infer<typeof signupSchema>;
type SigninSchema = z.infer<typeof loginSchema>;

export const signup = async (data: SignupSchema): Promise<ActionResponse> => {
  try {
    const { success, data: parsedData } = signupSchema.safeParse(data);
    if (!success) throw new Error("Invalid signup data");

    const { email, fullName, password } = parsedData;

    await connectDB();

    const exists = await User.exists({ email });
    if (exists) throw new Error("User already exists");

    const hashedPassword = await new Argon2id().hash(password);

    const user = new User({
      _id: generateTimeBasedId(),
      email,
      fullName,
      password: hashedPassword,
    });

    await user.save();

    const session = await lucia.createSession(user._id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return { success: true };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const signin = async (data: SigninSchema): Promise<ActionResponse> => {
  try {
    const { success, data: parsedData } = loginSchema.safeParse(data);
    if (!success) throw new Error("Invalid signin data");

    const { email, password } = parsedData;

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const validPassword = await new Argon2id().verify(user.password, password);
    if (!validPassword) throw new Error("Invalid credentials");

    const session = await lucia.createSession(user._id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return { success: true };
  } catch (error) {
    console.error("Signin error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};

export const signout = async (): Promise<ActionResponse> => {
  const { session } = await validateRequest();
  if (!session) return { success: false, error: "Unauthorized" };

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/login");
};
