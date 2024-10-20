import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
};

export const metadata: Metadata = {
  title: "Movie Empire",
  description:
    "Movie Empire is a platform where you can discover and explore movies and TV shows. You can search for your favorite movies or browse through our extensive library. We also have a feature to create and manage your own list so you can keep track of the movies you want to watch.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Movie Empire",
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    type: "website",
    images: [
      {
        url: "logo.jpg",
        width: 400,
        height: 400,
        type: "image/jpg",
      },
    ],
    title: "Movie Empire",
    url: "https://movie-empire.vercel.app/",
    description:
      "Movie Empire is a platform where you can discover and explore movies and TV shows. You can search for your favorite movies or browse through our extensive library. We also have a feature to create and manage your own list so you can keep track of the movies you want to watch.",
    siteName: "Movie Empire",
  },
  robots: "index, follow",
  creator: "Benedict Umeozor",
  publisher: "Benedict Umeozor",
  keywords: [
    "movie",
    "tv-shows",
    "streaming",
    "cinema",
    "film",
    "series",
    "entertainment",
    "blockbuster",
    "actor",
    "director",
  ],
  metadataBase: new URL("https://movie-empire.vercel.app"),
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
              <Header />
              <div>{children}</div>
              <Footer />
            </QueryProvider>
          </NotistackProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
