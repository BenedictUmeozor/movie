import { SingleMovie } from "@/types/globals";
import Container from "../ui/container";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { formatNumberWithCommas } from "@/utils/functions";
import clsx from "clsx";
import ListButton from "../shared/add-to-list-button";
import { validateRequest } from "@/lib/auth";

const Banner = async ({ movie }: { movie: SingleMovie }) => {
  const genres = movie.genres.map((genre) => genre.name).join(", ");
  const countries = movie.production_countries.map((c) => c.name).join(", ");
  const languages = movie.spoken_languages
    .map((l) => l.english_name)
    .join(", ");

  const { session } = await validateRequest();

  return (
    <div>
      <Container>
        <div className="mb-8 space-y-4 lg:hidden">
          <div className="grid grid-cols-[0.85fr_0.95fr] gap-4">
            <div>
              <Image
                src={process.env.IMG_URL + movie.poster_path}
                alt={movie.original_title}
                height={200}
                width={200}
                priority
                className="aspect-[4/6] w-full object-cover"
              />
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold leading-normal tracking-wide">
                {movie.title}
              </h3>
              <p className="text-medium-white">Movie</p>
            </div>
          </div>
          {!!session && (
            <ListButton
              mediaType="movie"
              tmdbId={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
            />
          )}
        </div>

        <div className="grid-cols-12 gap-8 lg:grid">
          <div className="col-span-3 space-y-4 max-lg:hidden">
            <Image
              src={process.env.IMG_URL + movie.poster_path}
              alt={movie.original_title}
              height={200}
              width={200}
              priority
              className="aspect-[4/6] w-full object-cover"
            />
            {!!session && (
              <ListButton
                mediaType="movie"
                tmdbId={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
              />
            )}
          </div>
          <div className="col-span-9">
            <h3 className="mb-2 text-4xl font-bold leading-normal tracking-wide max-lg:hidden">
              {movie.title}
            </h3>
            <p className="mb-8 text-medium-white max-lg:hidden">Movie</p>
            <ul className="space-y-3">
              <li className="grid grid-cols-[120px_1fr] items-start gap-4">
                <span className="font-medium">Title:</span>
                <span className="font-normal text-medium-white">
                  {movie.title}
                </span>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-start gap-4">
                <span className="font-medium">User score:</span>
                <div>
                  <Badge
                    className={clsx(
                      {
                        "bg-teal-500 hover:bg-teal-500":
                          movie.vote_average >= 9,
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
                </div>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-start gap-4">
                <span className="font-medium">Release date:</span>
                <span className="font-normal text-medium-white">
                  {movie.release_date}
                </span>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-start gap-4">
                <span className="font-medium">Genres:</span>
                <span className="font-normal text-medium-white">{genres}</span>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-start gap-4">
                <span className="font-medium">Country:</span>
                <span className="font-normal text-medium-white">
                  {countries}
                </span>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-start gap-4">
                <span className="font-medium">Language:</span>
                <span className="font-normal text-medium-white">
                  {languages}
                </span>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-start gap-4">
                <span className="font-medium">Budget:</span>
                <span className="font-normal text-medium-white">
                  ${formatNumberWithCommas(movie.budget)}
                </span>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-start gap-4">
                <span className="font-medium">Revenue:</span>
                <span className="font-normal text-medium-white">
                  ${formatNumberWithCommas(movie.revenue)}
                </span>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-start gap-4">
                <span className="font-medium">Runtime:</span>
                <span className="font-normal text-medium-white">
                  {movie.runtime} min
                </span>
              </li>
            </ul>
            <div className="mt-8 text-medium-white">{movie.overview}</div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Banner;
