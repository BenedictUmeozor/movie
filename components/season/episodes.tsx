import { TVShowController } from "@/types/tvshow";
import Container from "../ui/container";
import Image from "next/image";
import StarRatingAverage from "../shared/star-rating";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const Episodes = ({
  episodes,
  showId,
}: {
  episodes: TVShowController.Episode[];
  showId: string;
}) => {
  return (
    <div className="my-12">
      <Container>
        <h3 className="mb-8 text-2xl font-bold leading-normal tracking-wide max-lg:text-xl">
          List of Episodes
        </h3>
        <div className="space-y-6">
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="items-start gap-4 max-md:space-y-6 md:flex"
            >
              <Link
                href={`/tv-show/${showId}/season/${episode.season_number}/episode/${episode.episode_number}`}
                className="block md:w-64 lg:w-80"
              >
                <Image
                  src={process.env.IMG_URL + episode.still_path}
                  alt={episode.name}
                  height={200}
                  width={200}
                  className="aspect-[6/4] w-full rounded-sm object-cover"
                />
              </Link>
              <div className="flex-1 space-y-1">
                <Link
                  className="flex items-center gap-1 hover:underline"
                  href={`/tv-show/${showId}/season/${episode.season_number}/episode/${episode.episode_number}`}
                >
                  <span>
                    S{episode.season_number}E{episode.episode_number}
                  </span>
                  <ExternalLink size={16} color="#9f9f9f" />
                </Link>
                <StarRatingAverage rating={episode.vote_average} />
                <p className="text-sm text-medium-white">
                  Air date: {episode.air_date}
                </p>
                <p className="text-sm text-medium-white">
                  Runtime: {episode.runtime} min
                </p>
                <p className="text-sm text-medium-white">{episode.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
export default Episodes;
