import SigninForm from "@/components/auth/sign-in/form";
import { Video } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In - Movie Empire",
};

export default function Page() {
  return (
    <div className="w-[90%] max-w-[425px] items-center justify-center space-y-8 rounded-xl bg-medium-gray px-6 py-8 shadow">
      <header className="flex w-full flex-col items-center justify-center space-y-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold leading-normal tracking-wide"
        >
          <Video size={28} fill="#1475E6" stroke="#1475E6" />
          <span>Movie Empire</span>
        </Link>
        <p className="w-full text-center text-medium-white">Welcome back!</p>
      </header>
      <SigninForm />
    </div>
  );
}
