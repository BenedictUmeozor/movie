"use client";

import { Genre } from "@/types/globals";
import Container from "../ui/container";
import { Button } from "../ui/button";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import clsx from "clsx";

const GenreSorter = ({
  genres,
  pathname,
}: {
  genres: Genre[];
  pathname: string;
}) => {
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(searchParams.toString());

  const router = useRouter();
  const params = useParams() as { page: string };

  const genreParams = useMemo(() => {
    return searchParams.get("genres")?.split(",") || [];
  }, [searchParams]);

  const handleParams = (genreId: number) => {
    const genres = searchParams.get("genres");
    if (genres) {
      const newGenres = genres.split(",").includes(genreId.toString())
        ? genres.split(",").filter((genre) => genre !== genreId.toString())
        : [...genres.split(","), genreId.toString()];
      const uniqueGenres = Array.from(new Set(newGenres));
      if (uniqueGenres.length === 0) {
        urlParams.delete("genres");
      } else {
        urlParams.set("genres", uniqueGenres.join(","));
      }
      if (params.page) {
        router.replace(`${pathname}/${params.page}?${urlParams.toString()}`);
      } else {
        router.replace(`${pathname}?${urlParams.toString()}`);
      }
    } else {
      urlParams.set("genres", genreId.toString());
      if (params.page) {
        router.replace(`${pathname}/${params.page}?${urlParams.toString()}`);
      } else {
        router.replace(`${pathname}?${urlParams.toString()}`);
      }
    }
  };

  return (
    <section className="mb-12">
      <Container className="no-scrollbar flex flex-nowrap gap-2 overflow-y-auto">
        {genres.map((genre) => (
          <Button
            key={genre.id}
            variant={"outline"}
            className={clsx(
              "bg-transparent hover:border-primary-blue hover:bg-transparent hover:text-primary-blue",
              {
                "border-primary-blue text-primary-blue": genreParams.includes(
                  genre.id.toString(),
                ),
              },
            )}
            onClick={() => handleParams(genre.id)}
          >
            {genre.name}
          </Button>
        ))}
      </Container>
    </section>
  );
};
export default GenreSorter;
