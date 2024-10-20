"use client";

import { CSSProperties, memo, useCallback, useMemo } from "react";
import Container from "../ui/container";
import { Separator } from "../ui/separator";
import imdb from "@/assets/imdb-logo-2016-1.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import { Genre } from "@/types/globals";
import { AnimatePresence, motion } from "framer-motion";
import { getYear } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { getTvArray } from "@/utils/getters";
import useRandomIndex from "@/hooks/random-index";
import { TailwindSpinner } from "../ui/spinner";

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Hero = memo(
  ({ tvShowIds, genres }: { tvShowIds: number[]; genres: Genre[] }) => {
    const pathname = usePathname();
    const { randIndex } = useRandomIndex(tvShowIds.length);

    const { data, isPending, isError } = useQuery({
      queryKey: ["hero-tv-shows", pathname],
      queryFn: () => getTvArray(tvShowIds),
    });

    const currentTvShow = data?.[randIndex];

    const style: CSSProperties = useMemo(() => {
      return {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('${process.env.NEXT_PUBLIC_IMG_URL}${currentTvShow?.backdrop_path}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 0.5s ease-in-out",
      };
    }, [currentTvShow?.backdrop_path]);

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
      <AnimatePresence>
        <motion.section
          style={style}
          key={randIndex}
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.5 }}
          className="grid h-screen max-h-[600px] w-full place-items-center"
        >
          <Container>
            <div className="space-y-6">
              <Link
                href={`/tv-show/${currentTvShow?.id}`}
                className="text-4xl block font-bold leading-normal tracking-wide max-lg:text-center max-md:text-2xl"
              >
                {currentTvShow?.name}
              </Link>
              <div className="flex h-5 items-center space-x-4 text-sm font-medium max-lg:justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-14">
                    <Image src={imdb} alt="imdb" width={100} height={100} />
                  </div>
                  {currentTvShow?.vote_average?.toFixed(1)}
                </div>
                <Separator orientation="vertical" />
                {currentTvShow && (
                  <div>{getYear(currentTvShow.first_air_date)}</div>
                )}
                <Separator orientation="vertical" />
                {!!currentTvShow && (
                  <div className="text-primary-blue">
                    {getGenreName(currentTvShow?.genres?.[0]?.id)}
                  </div>
                )}
              </div>
              <p className="w-[95%] max-w-2xl max-lg:mx-auto max-md:text-sm max-lg:text-center">
                {currentTvShow?.overview}
              </p>
              <div className="items-center justify-center max-lg:flex">
                <Button
                  className="mt-8 bg-primary-blue hover:bg-blue-900"
                  size="lg"
                  asChild
                >
                  <Link
                    href={`/tv-show/${currentTvShow?.id}`}
                    className="inline-flex items-center gap-2"
                  >
                    See Details
                    <LinkIcon width={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </motion.section>
      </AnimatePresence>
    );
  },
);

Hero.displayName = "Hero";
export default Hero;
