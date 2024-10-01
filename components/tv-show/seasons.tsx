import { Season } from "@/types/globals";
import Image from "next/image";
import Container from "../ui/container";
import StarRatingAverage from "../shared/star-rating";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const Seasons = ({
  seasons,
  tvShowId,
}: {
  seasons: Season[];
  tvShowId: string;
}) => {
  const filtered = seasons.filter((season) => !!season.season_number);

  return (
    <div className="my-12">
      <Container>
        <h3 className="mb-8 flex items-center gap-2 text-2xl font-bold leading-normal tracking-wide max-lg:text-xl">
          List of Seasons
        </h3>
        <div className="space-y-4">
          {filtered.map((season) => (
            <SeasonItem season={season} tvShowId={tvShowId} key={season.id} />
          ))}
        </div>
      </Container>
    </div>
  );
};

const SeasonItem = ({
  season,
  tvShowId,
}: {
  season: Season;
  tvShowId: string;
}) => {
  return (
    <div className="items-start gap-4 max-md:space-y-6 md:flex">
      <div className="w-full max-w-md max-md:mx-auto md:w-32">
        <Image
          src={process.env.IMG_URL + season.poster_path}
          alt={season.name}
          height={200}
          width={200}
          className="w-full object-contain"
        />
      </div>
      <div className="flex-1 space-y-1">
        <Link
          href={`/tv-show/${tvShowId}/season/${season.season_number}`}
          className="flex items-center gap-1 hover:underline"
        >
          <span>
            S{season.season_number} - {season.name}
          </span>
          <ExternalLink size={16} color="#9f9f9f" />
        </Link>
        <StarRatingAverage rating={season.vote_average} />
        <span className="text-sm text-medium-white">
          {season.episode_count} episodes
        </span>
        <p className="text-sm text-medium-white">Air date: {season.air_date}</p>
        <p className="text-sm text-medium-white">{season.overview}</p>
      </div>
    </div>
  );
};
export default Seasons;
