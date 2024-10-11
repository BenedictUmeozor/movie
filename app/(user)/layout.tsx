import type { Metadata } from "next";
import { Lato } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "../globals.css";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { SessionProvider } from "@/providers/session";
import { validateRequest } from "@/lib/auth";
import QueryProvider from "@/providers/query";
import NotistackProvider from "@/providers/snackbar";

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
  const session = await validateRequest();

  return (
    <html lang="en">
      <body className={`${lato.className} bg-dark-gray text-white antialiased`}>
        <NextTopLoader showSpinner={false} />
        <SessionProvider value={session}>
          <NotistackProvider>
            <QueryProvider>
              <section className="grid min-h-screen grid-rows-[auto_1fr_auto]">
                <Header />
                <div>{children}</div>
                <Footer />
              </section>
            </QueryProvider>
          </NotistackProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
