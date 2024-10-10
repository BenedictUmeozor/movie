import type { Metadata } from "next";
import { Lato } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "../globals.css";
import { CSSProperties } from "react";
import movie_bg from "@/assets/movie_bg.jpg";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import QueryProvider, { getQueryClient } from "@/providers/query";
import NotistackProvider from "@/providers/snackbar";
import { listOptions } from "@/lib/queries";

const style: CSSProperties = {
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('${movie_bg.src}')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Movie Empire",
};

export const revalidate = 3600;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = await validateRequest();

  if (session) {
    redirect("/");
  }

  const queryClient = getQueryClient();

  queryClient.prefetchQuery(listOptions());

  return (
    <html lang="en">
      <body className={`${lato.className} bg-dark-gray text-white antialiased`}>
        <NextTopLoader showSpinner={false} />
        <QueryProvider>
          <NotistackProvider>
            <main
              style={style}
              className="grid min-h-screen place-items-center py-8"
            >
              {children}
            </main>
          </NotistackProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
