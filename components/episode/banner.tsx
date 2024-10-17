import Container from "../ui/container";
import Image from "next/image";
import RatingAverage from "../shared/rating";
import { TVShowController } from "@/types/tvshow";

const Banner = ({ episode }: { episode: TVShowController.SingleEpisode }) => {
  return (
    <div>
      <Container>
        <div className="mb-8 grid grid-cols-[0.8fr_1fr] gap-6 lg:hidden">
          <div>
            <Image
              src={process.env.IMG_URL + episode.still_path}
              alt={episode.name}
              height={200}
              width={200}
              className="w-full object-contain"
            />
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold leading-normal tracking-wide">
              S{episode.season_number}E{episode.episode_number}
            </h3>
            <p className="text-medium-white">{episode.name}</p>
          </div>
        </div>

        <div className="grid-cols-12 gap-8 lg:grid">
          <div className="col-span-5 max-lg:hidden">
            <Image
              src={process.env.IMG_URL + episode.still_path}
              alt={episode.name}
              height={200}
              width={200}
              className="aspect-[6/4] w-full rounded-sm object-cover"
            />
          </div>
          <div className="col-span-7">
            <h3 className="mb-2 text-4xl font-bold leading-normal tracking-wide max-lg:hidden">
              S{episode.season_number}E{episode.episode_number}
            </h3>
            <p className="mb-8 text-medium-white max-lg:hidden">
              {episode.name}
            </p>
            <ul className="space-y-3">
              <li className="grid grid-cols-[120px_1fr] items-center gap-4">
                <span className="font-medium">Air date:</span>
                <span className="font-normal text-medium-white">
                  {episode.air_date}
                </span>
              </li>
              <li className="grid grid-cols-[120px_1fr] items-center gap-4">
                <span className="font-medium">User score:</span>
                <div>
                  <RatingAverage rating={episode.vote_average} />
                </div>
              </li>
            </ul>
            <div className="mt-8 text-medium-white">{episode.overview}</div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Banner;
