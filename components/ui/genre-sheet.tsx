"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Button } from "./button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Genre } from "@/types/globals";
import { ScrollArea } from "./scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const GenreSheet = ({
  movieGenres,
  tvShowGenres,
}: {
  movieGenres: Genre[];
  tvShowGenres: Genre[];
}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center gap-2 max-md:hidden"
        >
          Genres <ChevronDown width={16} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className={cn(
          "ring-offset-neutral-950 focus:ring-neutral-300 data-[state=open]:bg-neutral-800",
          "w-[90%] max-w-md sm:w-[400px]",
        )}
      >
        <SheetHeader>
          <SheetTitle className="text-white">Genres</SheetTitle>
          <div className="relative mt-4">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input
              type="search"
              placeholder="Search genres..."
              className="w-full rounded-md bg-neutral-700 py-2 pl-8 pr-4 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300"
            />
          </div>
        </SheetHeader>
        <ScrollArea className="mt-6 h-[calc(100vh-180px)]">
          <Tabs defaultValue="movies">
            <TabsList className={cn("mb-6 w-full rounded-md bg-medium-gray")}>
              <TabsTrigger
                value="movies"
                className={cn(
                  "w-1/2 rounded py-2 text-sm font-medium transition-colors duration-200 data-[state=active]:bg-primary-blue data-[state=inactive]:bg-transparent data-[state=active]:text-white data-[state=inactive]:text-gray-400",
                )}
              >
                Movies
              </TabsTrigger>
              <TabsTrigger
                value="tvshows"
                className={cn(
                  "w-1/2 rounded py-2 text-sm font-medium transition-colors duration-200 data-[state=active]:bg-primary-blue data-[state=inactive]:bg-transparent data-[state=active]:text-white data-[state=inactive]:text-gray-400",
                )}
              >
                TV Shows
              </TabsTrigger>
            </TabsList>
            <TabsContent value="movies">
              <ul className="grid grid-cols-2 gap-3">
                {movieGenres.map((genre) => (
                  <li key={genre.id}>
                    <Link
                      href={`/movies/genres/${genre.id}`}
                      className={cn(
                        "block rounded-md p-2 text-sm transition-colors hover:bg-neutral-600",
                        {
                          "bg-primary-blue":
                            pathname.includes(genre.id.toString()) &&
                            pathname.includes("movies"),
                          "bg-neutral-700": !(
                            pathname.includes(genre.id.toString()) &&
                            pathname.includes("movies")
                          ),
                        },
                      )}
                    >
                      {genre.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="tvshows">
              <ul className="grid grid-cols-2 gap-3">
                {tvShowGenres.map((genre) => (
                  <li key={genre.id}>
                    <Link
                      href={`/tv-shows/genres/${genre.id}`}
                      className={cn(
                        "block rounded-md p-2 text-sm transition-colors hover:bg-neutral-600",
                        {
                          "bg-primary-blue":
                            pathname.includes(genre.id.toString()) &&
                            pathname.includes("tv-shows"),
                          "bg-neutral-700": !(
                            pathname.includes(genre.id.toString()) &&
                            pathname.includes("tv-shows")
                          ),
                        },
                      )}
                    >
                      {genre.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default GenreSheet;
