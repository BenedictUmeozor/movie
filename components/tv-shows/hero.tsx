"use client";

import { CSSProperties, memo, useEffect, useMemo, useState } from "react";
import Container from "../ui/container";
import { Separator } from "../ui/separator";
import imdb from "@/assets/imdb-logo-2016-1.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { Genre, SingleTvShow } from "@/types/globals";
// import { AnimatePresence, motion } from "framer-motion";
import { getYear } from "@/lib/utils";

// const fadeVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
// };

const getTvArray = async (tvShowIds: number[]): Promise<SingleTvShow[]> => {
  const promises = tvShowIds.map(async (id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/tv/${id}?&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    );
    return response.json();
  });

  return Promise.all(promises);
};

const Hero = memo(
  ({ tvShowIds, genres }: { tvShowIds: number[]; genres: Genre[] }) => {
    const [tvShow, setTvShow] = useState<SingleTvShow[]>([]);
    const [randIndex, setRandIndex] = useState(
      Math.floor(Math.random() * tvShowIds.length),
    );

    const style: CSSProperties = useMemo(() => {
      return {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('${process.env.NEXT_PUBLIC_IMG_URL}${tvShow[randIndex]?.backdrop_path}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 0.5s ease-in-out",
      };
    }, [tvShow, randIndex]);

    useEffect(() => {
      if (tvShow.length === 0) {
        (async () => {
          const array = await getTvArray(tvShowIds);
          setTvShow(array);
        })();
      }
    }, [tvShow, tvShowIds]);

    useEffect(() => {
      const interval = setInterval(() => {
        setRandIndex((prevIndex) => {
          let newIndex;
          do {
            newIndex = Math.floor(Math.random() * tvShowIds.length);
          } while (newIndex === prevIndex);
          return newIndex;
        });
      }, 10000); // Change movie every 10 seconds

      return () => clearInterval(interval);
    }, [tvShowIds.length]);

    return (
      <section
        style={style}
        className="grid h-screen max-h-[600px] w-full place-items-center"
      >
        <Container>
          {tvShow.length > 0 && (
            <div className="space-y-6">
              <Link
                href={`/tv-show/${tvShow[randIndex].id}`}
                className="text-4xl font-bold leading-normal tracking-wide max-lg:text-center max-md:text-2xl"
              >
                {tvShow[randIndex].name}
              </Link>
              <div className="flex h-5 items-center space-x-4 text-sm font-medium max-lg:justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-14">
                    <Image src={imdb} alt="imdb" width={100} height={100} />
                  </div>
                  {tvShow[randIndex]?.vote_average?.toFixed(1)}
                </div>
                <Separator orientation="vertical" />
                <div>{getYear(tvShow[randIndex].first_air_date)}</div>
                <Separator orientation="vertical" />
                <div className="text-primary-blue">
                  {!genres
                    ? ""
                    : genres?.find(
                        (genre) => tvShow[randIndex].genres[0]?.id === genre.id,
                      )?.name}
                </div>
              </div>
              <p className="w-[95%] max-w-2xl max-lg:mx-auto max-lg:text-center">
                {tvShow[randIndex].overview}
              </p>
              <div className="items-center justify-center max-lg:flex">
                <Button
                  className="mt-8 bg-primary-blue hover:bg-blue-900"
                  size={"lg"}
                >
                  <Link href="/" className="flex w-full items-center gap-2">
                    <PlayCircle size={20} />
                    Watch Trailer
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </Container>
      </section>
    );
  },
);

Hero.displayName = "Hero";
export default Hero;
