"use client";

import { formatDate } from "@/lib/utils";
import { Movie as MovieInterface } from "@/types/globals";
import Image from "next/image";

const Movie = ({ movie }: { movie: MovieInterface }) => {
  return (
    <div className="aspect-[5/6] rounded p-2 transition-colors hover:bg-light-gray">
      <div className="relative mx-auto">
        <Image
          src={process.env.NEXT_PUBLIC_IMG_URL + movie.poster_path}
          alt={movie.title}
          width={200}
          height={300}
          className="aspect-[5/6] w-full rounded-tl rounded-tr object-cover"
        />
      </div>
      <div className="mx-auto space-y-2 py-1">
        <h3 className="text-sm font-semibold">{movie.title}</h3>
        <p className="text-sm text-light-white">
          {formatDate(movie.release_date)}
        </p>
      </div>
    </div>
  );
};
export default Movie;
