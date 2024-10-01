import Container from "../ui/container";
import Image from "next/image";
import RatingAverage from "../shared/rating";
import { TVShowController } from "@/types/tvshow";

const Banner = ({ season }: { season: TVShowController.Show }) => {
  return (
    <div className="mt-12">
      <Container>
        <div className="mb-8 grid grid-cols-[0.8fr_1fr] gap-6 lg:hidden">
          <div>
            <Image
              src={process.env.IMG_URL + season.poster_path}
              alt={season.name}
              height={200}
              width={200}
              className="aspect-[4/6] w-full object-cover"
            />
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold leading-normal tracking-wide">
              Season {season.season_number}
            </h3>
            <p className="text-medium-white">{season.name}</p>
          </div>
        </div>

        <div className="grid-cols-12 gap-8 lg:grid">
          <div className="col-span-3 max-lg:hidden">
            <Image
              src={process.env.IMG_URL + season.poster_path}
              alt={season.name}
              height={200}
              width={200}
              className="aspect-[4/6] w-full object-cover"
            />
          </div>
          <div className="col-span-9">
            <h3 className="mb-2 text-4xl font-bold leading-normal tracking-wide max-lg:hidden">
              Season {season.season_number}
            </h3>
            <p className="mb-8 text-medium-white max-lg:hidden">
              {season.name}
            </p>
            <ul className="space-y-3">
              <li className="grid grid-cols-[120px_1fr] items-center gap-4">
                <span className="font-medium">Air date:</span>
                <span className="font-normal text-medium-white">
                  {season.air_date}
                </span>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-center gap-4">
                <span className="font-medium">User score:</span>
                <div>
                  <RatingAverage rating={season.vote_average} />
                </div>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-center gap-4">
                <span className="font-medium">Number of episodes:</span>
                <span className="font-normal text-medium-white">
                  {season.episodes.length}
                </span>
              </li>
            </ul>
            <div className="mt-8 text-medium-white">{season.overview}</div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Banner;
