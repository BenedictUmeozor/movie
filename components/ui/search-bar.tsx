"use client";

import { Input } from "./input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { useParams } from "next/navigation";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { query } = useParams();

  const querySchema = z.object({
    query: z.string().min(1, { message: "Please enter a search query" }),
  });

  const movieForm = useForm<z.infer<typeof querySchema>>({
    resolver: zodResolver(querySchema),
    defaultValues: {
      query: "",
    },
  });

  const tvShowForm = useForm<z.infer<typeof querySchema>>({
    resolver: zodResolver(querySchema),
    defaultValues: {
      query: "",
    },
  });

  const handleMovieFormSubmit = ({ query }: z.infer<typeof querySchema>) => {
    router.push(`/search/movies/${query}`);
    setOpen(false);
  };

  const handleTvShowFormSubmit = ({ query }: z.infer<typeof querySchema>) => {
    router.push(`/search/tv-shows/${query}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative z-10">
          <Input
            type="text"
            placeholder="Search anything..."
            defaultValue={query || ""}
          />
        </div>
      </DialogTrigger>
      <DialogContent
        className={cn("w-[90%] max-w-[425px] bg-black text-white")}
      >
        <DialogHeader>
          <DialogTitle asChild>
            <div className="flex items-center gap-2">
              Search <Search size={16} />
            </div>
          </DialogTitle>
          <DialogDescription>Search movies or series</DialogDescription>
        </DialogHeader>
        <div>
          <Tabs defaultValue="movies" className="mx-auto w-[400px]">
            <TabsList className={cn("bg-medium-gray")}>
              <TabsTrigger
                value="movies"
                className={cn(
                  "data-[state=active]:bg-primary-blue data-[state=active]:text-white",
                )}
              >
                Movies
              </TabsTrigger>
              <TabsTrigger
                value="series"
                className={cn(
                  "data-[state=active]:bg-primary-blue data-[state=active]:text-white",
                )}
              >
                TV Shows
              </TabsTrigger>
            </TabsList>
            <TabsContent value="movies">
              <Form {...movieForm}>
                <form
                  className="space-y-8"
                  onSubmit={movieForm.handleSubmit(handleMovieFormSubmit)}
                >
                  <FormField
                    control={movieForm.control}
                    name="query"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Movie</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter movie name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    variant={"outline"}
                    className={cn(
                      "border-primary-blue bg-transparent text-primary-blue hover:bg-primary-blue/80 hover:text-white",
                    )}
                  >
                    Search
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="series">
              <Form {...tvShowForm}>
                <form
                  className="space-y-8"
                  onSubmit={tvShowForm.handleSubmit(handleTvShowFormSubmit)}
                >
                  <FormField
                    control={tvShowForm.control}
                    name="query"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tv Show</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter tv show name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    variant={"outline"}
                    className={cn(
                      "border-primary-blue bg-transparent text-primary-blue hover:bg-primary-blue/80 hover:text-white",
                    )}
                  >
                    Search
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default SearchBar;
