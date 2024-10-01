import { TvShowApiResponse } from "@/types/globals";
import Container from "../ui/container";
import TVShow from "../ui/tvshow";

const getSimilarSeries = async ({
  tvShowId,
}: {
  tvShowId: string;
}): Promise<TvShowApiResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/tv/${tvShowId}/similar?api_key=${process.env.API_KEY}`,
  );

  return response.json();
};

const SimilarTvShows = async ({ tvShowId }: { tvShowId: string }) => {
  const { results } = await getSimilarSeries({ tvShowId });

  return (
    <div className="my-12">
      <Container>
        <h3 className="mb-8 flex items-center gap-2 text-2xl font-bold leading-normal tracking-wide max-lg:text-xl">
          Similar
        </h3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {results.slice(0, 8).map((tvShow) => (
            <TVShow key={tvShow.id} tvShow={tvShow} />
          ))}
        </div>
      </Container>
    </div>
  );
};
export default SimilarTvShows;
