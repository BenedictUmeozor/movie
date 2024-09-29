"use client";

import { formatDate } from "@/lib/utils";
import { Movie as MovieInterface } from "@/types/globals";
import Image from "next/image";
import Link from "next/link";

const Movie = ({ movie }: { movie: MovieInterface }) => {
  return (
    <div className="aspect-[5/6] rounded p-2 transition-colors hover:bg-light-gray">
      <Link href={`/movie/${movie.id}`} className="relative mx-auto">
        <Image
          src={process.env.NEXT_PUBLIC_IMG_URL + movie.poster_path}
          alt={movie.title}
          width={200}
          height={300}
          className="aspect-[5/6] w-full rounded-tl rounded-tr object-cover"
        />
      </Link>
      <div className="mx-auto space-y-2 py-1">
        <Link href={`/movie/${movie.id}`} className="text-sm font-semibold">
          {movie.title}
        </Link>
        <p className="text-sm text-light-white">
          {formatDate(movie.release_date)}
        </p>
      </div>
    </div>
  );
};
export default Movie;
