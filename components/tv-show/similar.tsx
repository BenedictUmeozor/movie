import { TvShowApiResponse } from "@/types/globals";
import Container from "../ui/container";
import { RenderTvShows } from "../shared/render";

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

  const tvShows = results.slice(0, 8);

  return (
    <div className="my-12">
      <Container>
        <h3 className="mb-8 flex items-center gap-2 text-2xl font-bold leading-normal tracking-wide max-lg:text-xl">
          Similar
        </h3>
        <RenderTvShows tvShows={tvShows} />
      </Container>
    </div>
  );
};
export default SimilarTvShows;
