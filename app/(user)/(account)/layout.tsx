import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { session } = await validateRequest();

  if (!session) {
    redirect("/sign-in");
  }

  return <section className="my-8">{children}</section>;
}
