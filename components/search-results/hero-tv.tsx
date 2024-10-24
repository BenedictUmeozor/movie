import { CSSProperties } from "react";
import Container from "../ui/container";
import { Separator } from "../ui/separator";
import imdb from "@/assets/imdb-logo-2016-1.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { LinkIcon } from "lucide-react";
import { Genre } from "@/types/globals";
import { getYear } from "@/lib/utils";
import { getSingleTvShow } from "@/utils/getters";

const Hero = async ({
  tvShowId,
  genres,
}: {
  tvShowId: number;
  genres: Genre[];
}) => {
  const tvShow = await getSingleTvShow(tvShowId);

  const style: CSSProperties = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('${process.env.IMG_URL}${tvShow.backdrop_path}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transition: "background-image 0.5s ease-in-out",
  };

  return (
    <section
      style={style}
      className="grid h-screen max-h-[600px] w-full place-items-center"
    >
      <Container>
        <div className="space-y-6">
          <Link
            href={`/tv-show/${tvShow.id}`}
            className="line-clamp-4 block text-4xl font-bold leading-normal tracking-wide max-lg:text-center max-md:text-2xl"
          >
            {tvShow.name}
          </Link>
          <div className="flex h-5 items-center space-x-4 text-sm font-medium max-lg:justify-center">
            <div className="flex items-center gap-2">
              <div className="w-14">
                <Image src={imdb} alt="imdb" width={100} height={100} />
              </div>
              {tvShow?.vote_average?.toFixed(1)}
            </div>
            <Separator orientation="vertical" />
            <div>{getYear(tvShow.first_air_date)}</div>
            <Separator orientation="vertical" />
            <div className="text-primary-blue">
              {!genres
                ? ""
                : genres?.find((genre) => tvShow.genres[0]?.id === genre.id)
                    ?.name}
            </div>
          </div>
          <p className="w-[95%] max-w-2xl max-lg:mx-auto max-lg:text-center max-md:text-sm">
            {tvShow.overview}
          </p>
          <div className="items-center justify-center max-lg:flex">
            <Button
              className="mt-8 bg-primary-blue hover:bg-blue-900"
              size="lg"
              asChild
            >
              <Link
                href={`/tv-show/${tvShow.id}`}
                className="inline-flex items-center gap-2"
              >
                See Details
                <LinkIcon width={16} />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
