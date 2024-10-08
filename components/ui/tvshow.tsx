"use client";

import { formatDate } from "@/lib/utils";
import { TvShow } from "@/types/globals";
import Image from "next/image";
import { Badge } from "./badge";
import clsx from "clsx";
import Link from "next/link";

const TVShow = ({ tvShow }: { tvShow: TvShow }) => {
  return (
    <div className="aspect-[5/6] rounded p-2 transition-colors hover:bg-light-gray">
      <Link href={`/tv-show/${tvShow.id}`} className="relative mx-auto block">
        <Image
          src={process.env.NEXT_PUBLIC_IMG_URL + tvShow.poster_path}
          alt={tvShow.name}
          width={200}
          height={300}
          className="aspect-[5/6] w-full rounded-tl rounded-tr object-cover"
        />
        <Badge
          className={clsx(
            "absolute left-1 top-1",
            {
              "bg-teal-500 hover:bg-teal-500": tvShow.vote_average >= 9,
            },
            {
              "bg-green-500 hover:bg-green-500":
                tvShow.vote_average >= 8 && tvShow.vote_average < 9,
            },
            {
              "bg-lime-500 hover:bg-lime-500":
                tvShow.vote_average >= 7 && tvShow.vote_average < 8,
            },
            {
              "bg-yellow-400 hover:bg-yellow-400":
                tvShow.vote_average >= 6 && tvShow.vote_average < 7,
            },
            {
              "bg-orange-400 hover:bg-orange-400":
                tvShow.vote_average >= 5 && tvShow.vote_average < 6,
            },
            {
              "bg-red-500 hover:bg-red-500": tvShow.vote_average < 5,
            },
          )}
        >
          {tvShow.vote_average.toFixed(1)}
        </Badge>
      </Link>
      <div className="mx-auto space-y-2 py-1">
        <h3 className="text-sm font-semibold">{tvShow.name}</h3>
        <p className="text-sm text-light-white">
          {formatDate(tvShow.first_air_date)}
        </p>
      </div>
    </div>
  );
};
export default TVShow;
