import { MovieResponse } from "@/types/globals";
import Container from "../ui/container";
import { RenderMovies } from "../shared/render";

const getSimilarMovies = async ({
  movieId,
}: {
  movieId: string;
}): Promise<MovieResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/movie/${movieId}/similar?api_key=${process.env.API_KEY}`,
  );

  return response.json();
};

const SimilarMovies = async ({ movieId }: { movieId: string }) => {
  const { results } = await getSimilarMovies({ movieId });

  const movies = results.slice(0, 10);

  return (
    <div className="my-12">
      <Container>
        <h3 className="mb-8 flex items-center gap-2 text-2xl font-bold leading-normal tracking-wide max-lg:text-xl">
          Similar
        </h3>
        <RenderMovies movies={movies} />
      </Container>
    </div>
  );
};
export default SimilarMovies;
