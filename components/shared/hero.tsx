"use client";

import { memo, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlayCircle } from "lucide-react";

import Container from "../ui/container";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { TailwindSpinner } from "../ui/spinner";
import imdb from "@/assets/imdb-logo-2016-1.svg";
import { Genre } from "@/types/globals";
import { getYear } from "@/lib/utils";
import { getMovieArray } from "@/utils/getters";
import useRandomIndex from "@/hooks/random-index";

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

interface HeroProps {
  movieIds: number[];
  genres: Genre[];
}

const Hero = memo(({ movieIds, genres }: HeroProps) => {
  const pathname = usePathname();
  const { randIndex } = useRandomIndex(movieIds.length);

  const { data, isPending, isError } = useQuery({
    queryKey: ["hero-movies", pathname],
    queryFn: () => getMovieArray(movieIds),
  });

  const currentMovie = data?.[randIndex];

  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('${process.env.NEXT_PUBLIC_IMG_URL}${currentMovie?.backdrop_path}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transition: "background-image 0.5s ease-in-out",
    }),
    [currentMovie?.backdrop_path],
  );

  const getGenreName = useCallback(
    (genreId: number) =>
      genres?.find((genre) => genre.id === genreId)?.name || "",
    [genres],
  );

  if (isPending) {
    return (
      <section className="grid h-screen max-h-[600px] w-full animate-pulse place-items-center bg-black">
        <TailwindSpinner className="h-10 w-10" />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="grid h-screen max-h-[600px] w-full place-items-center bg-black">
        <p className="text-2xl text-red-600">Something went wrong</p>
      </section>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.section
        style={backgroundStyle}
        key={randIndex}
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.25 }}
        className="grid h-screen max-h-[600px] w-full place-items-center"
      >
        <Container>
          <div className="space-y-6">
            <Link
              href={`/movie/${currentMovie?.id}`}
              className="block text-4xl font-bold leading-normal tracking-wide max-lg:text-center max-md:text-2xl"
            >
              {currentMovie?.title}
            </Link>
            <div className="flex h-5 items-center space-x-4 text-sm font-medium max-lg:justify-center">
              <div className="flex items-center gap-2">
                <div className="w-14">
                  <Image src={imdb} alt="imdb" width={100} height={100} />
                </div>
                {currentMovie?.vote_average.toFixed(1)}
              </div>
              <Separator orientation="vertical" />
              {!!currentMovie && (
                <div>{getYear(currentMovie.release_date)}</div>
              )}
              <Separator orientation="vertical" />
              {!!currentMovie && (
                <div className="text-primary-blue">
                  {getGenreName(currentMovie?.genres?.[0]?.id)}
                </div>
              )}
            </div>
            <p className="w-[95%] max-w-2xl max-lg:mx-auto max-lg:text-center">
              {currentMovie?.overview}
            </p>
            <div className="items-center justify-center max-lg:flex">
              <Button
                className="mt-8 bg-primary-blue hover:bg-blue-900"
                size="lg"
                asChild
              >
                <Link
                  href={`https://www.imdb.com/title/${currentMovie?.imdb_id}`}
                  target="_blank"
                  className="inline-flex items-center gap-2"
                >
                  <PlayCircle size={20} />
                  Watch Trailer
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </motion.section>
    </AnimatePresence>
  );
});

Hero.displayName = "Hero";
export default Hero;
