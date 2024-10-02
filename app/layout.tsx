import type { Metadata } from "next";
import { Lato } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Movie Empire",
};

export const revalidate = 3600;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} bg-dark-gray text-white antialiased`}>
        <Header />
        <NextTopLoader showSpinner={false} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
