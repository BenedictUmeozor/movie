import { SingleTvShow } from "@/types/globals";
import Container from "../ui/container";
import Image from "next/image";
import RatingAverage from "../shared/rating";

const Banner = ({ tvShow }: { tvShow: SingleTvShow }) => {
  const genres = tvShow.genres.map((genre) => genre.name).join(", ");

  return (
    <div className="mt-12">
      <Container>
        <div className="mb-8 grid grid-cols-[0.8fr_1fr] gap-6 lg:hidden">
          <div>
            <Image
              src={process.env.IMG_URL + tvShow.poster_path}
              alt={tvShow.name}
              height={200}
              width={200}
              className="aspect-[4/6] w-full object-cover"
            />
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold leading-normal tracking-wide">
              {tvShow.name}
            </h3>
            <p className="text-medium-white">Series</p>
          </div>
        </div>

        <div className="grid-cols-12 gap-8 lg:grid">
          <div className="col-span-3 max-lg:hidden">
            <Image
              src={process.env.IMG_URL + tvShow.poster_path}
              alt={tvShow.name}
              height={200}
              width={200}
              className="aspect-[4/6] w-full object-cover"
            />
          </div>
          <div className="col-span-9">
            <h3 className="mb-2 text-4xl font-bold leading-normal tracking-wide max-lg:hidden">
              {tvShow.name}
            </h3>
            <p className="mb-8 text-medium-white max-lg:hidden">Series</p>
            <ul className="space-y-3">
              <li className="grid grid-cols-[120px_1fr] items-center gap-4">
                <span className="font-medium">Title:</span>
                <span className="font-normal text-medium-white">
                  {tvShow.name}
                </span>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-center gap-4">
                <span className="font-medium">User score:</span>
                <div>
                  <RatingAverage rating={tvShow.vote_average} />
                </div>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-center gap-4">
                <span className="font-medium">First air date:</span>
                <span className="font-normal text-medium-white">
                  {tvShow.first_air_date}
                </span>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-center gap-4">
                <span className="font-medium">Genres:</span>
                <span className="font-normal text-medium-white">{genres}</span>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-center gap-4">
                <span className="font-medium">Number of seasons:</span>
                <span className="font-normal text-medium-white">
                  {tvShow.number_of_seasons}
                </span>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-center gap-4">
                <span className="font-medium">Number of episodes:</span>
                <span className="font-normal text-medium-white">
                  {tvShow.number_of_episodes}
                </span>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-center gap-4">
                <span className="font-medium">Status:</span>
                <span className="font-normal text-medium-white">
                  {tvShow.status}
                </span>
              </li>
            </ul>
            <div className="mt-8 text-medium-white">{tvShow.overview}</div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Banner;
