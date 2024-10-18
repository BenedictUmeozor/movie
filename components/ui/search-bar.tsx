"use client";

import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Search } from "lucide-react";

import { Input } from "./input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { cn } from "@/lib/utils";

const querySchema = z.object({
  query: z.string().min(1, { message: "Please enter a search query" }),
});

type QuerySchema = z.infer<typeof querySchema>;

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const movieForm = useForm<QuerySchema>({
    resolver: zodResolver(querySchema),
    defaultValues: { query: "" },
  });

  const tvShowForm = useForm<QuerySchema>({
    resolver: zodResolver(querySchema),
    defaultValues: { query: "" },
  });

  const handleSubmit =
    (type: "movies" | "tv-shows") =>
    ({ query }: QuerySchema) => {
      router.push(`/search/${type}/${query}`);
      setOpen(false);
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative z-10 mx-auto w-full max-w-md">
          <Input
            type="text"
            placeholder="Search anything..."
            className="pr-10 focus:ring-2 focus:ring-primary-blue"
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
            size={20}
          />
        </div>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "w-[95%] max-w-lg rounded-lg bg-black p-6 text-white shadow-xl",
        )}
      >
        <DialogHeader className="mb-6">
          <DialogTitle className="mb-2 flex items-center gap-3 text-2xl font-bold">
            Search <Search size={24} className="text-primary-blue" />
          </DialogTitle>
          <p className="text-gray-400">Search movies or TV shows</p>
        </DialogHeader>
        <Tabs defaultValue="movies" className="w-full">
          <TabsList className="mb-6 w-full rounded-md bg-medium-gray p-1">
            {["movies", "tv-shows"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className="w-1/2 rounded py-2 text-sm font-medium transition-colors duration-200 data-[state=active]:bg-primary-blue data-[state=inactive]:bg-transparent data-[state=active]:text-white data-[state=inactive]:text-gray-400"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          {["movies", "tv-shows"].map((type, index) => (
            <TabsContent key={type} value={type} className="focus:outline-none">
              <Form {...(index === 0 ? movieForm : tvShowForm)}>
                <form
                  className="space-y-6"
                  onSubmit={(index === 0 ? movieForm : tvShowForm).handleSubmit(
                    handleSubmit(type as "movies" | "tv-shows"),
                  )}
                >
                  <FormField
                    control={(index === 0 ? movieForm : tvShowForm).control}
                    name="query"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">
                          {index === 0 ? "Movie" : "TV Show"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`Enter ${index === 0 ? "movie" : "TV show"} name`}
                            {...field}
                            className="border-none bg-medium-gray text-white focus:ring-2 focus:ring-primary-blue"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className={cn(
                      "w-full bg-primary-blue text-white transition-colors duration-200 hover:bg-primary-blue/80",
                      "focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2",
                    )}
                  >
                    Search
                  </Button>
                </form>
              </Form>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
