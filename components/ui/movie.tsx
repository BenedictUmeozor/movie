"use client";

import { formatDate } from "@/lib/utils";
import { Movie as MovieInterface } from "@/types/globals";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./badge";
import clsx from "clsx";
import { useSession } from "@/providers/session";
import AddToListButton from "../shared/list-button";
import { memo } from "react";

const Movie = memo(({ movie }: { movie: MovieInterface }) => {
  const { session } = useSession();

  return (
    <div className="aspect-[5/6] rounded p-2 transition-colors hover:bg-light-gray">
      <Link href={`/movie/${movie.id}`} className="relative mx-auto">
        <Image
          src={process.env.NEXT_PUBLIC_IMG_URL + movie.poster_path}
          alt={movie.title}
          width={200}
          height={300}
          style={{ maxWidth: "100%" }}
          className="aspect-[5/6] w-full rounded-tl rounded-tr object-cover"
        />
        <Badge
          className={clsx(
            "absolute left-1 top-1",
            {
              "bg-teal-500 hover:bg-teal-500": movie.vote_average >= 9,
            },
            {
              "bg-green-500 hover:bg-green-500":
                movie.vote_average >= 8 && movie.vote_average < 9,
            },
            {
              "bg-lime-500 hover:bg-lime-500":
                movie.vote_average >= 7 && movie.vote_average < 8,
            },
            {
              "bg-yellow-400 hover:bg-yellow-400":
                movie.vote_average >= 6 && movie.vote_average < 7,
            },
            {
              "bg-orange-400 hover:bg-orange-400":
                movie.vote_average >= 5 && movie.vote_average < 6,
            },
            {
              "bg-red-500 hover:bg-red-500": movie.vote_average < 5,
            },
          )}
        >
          {movie.vote_average.toFixed(1)}
        </Badge>
      </Link>
      <div className="mx-auto space-y-2 py-1">
        <Link href={`/movie/${movie.id}`} className="text-sm font-semibold">
          {movie.title}
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-sm text-light-white">
            {formatDate(movie.release_date)}
          </p>
          {!!session && (
            <AddToListButton
              mediaType="movie"
              posterPath={movie.poster_path}
              title={movie.title}
              tmdbId={movie.id}
            />
          )}
        </div>
      </div>
    </div>
  );
});

Movie.displayName = "Movie";
export default Movie;
