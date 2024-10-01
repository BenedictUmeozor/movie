import { MovieResponse } from "@/types/globals";
import Container from "../ui/container";
import Movie from "../ui/movie";

const getRecommendations = async ({
  movieId,
}: {
  movieId: string;
}): Promise<MovieResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/movie/${movieId}/recommendations?api_key=${process.env.API_KEY}`,
  );

  return response.json();
};

const SimilarMovies = async ({ movieId }: { movieId: string }) => {
  const { results } = await getRecommendations({ movieId });

  return (
    <div className="my-12">
      <Container>
        <h3 className="mb-8 flex items-center gap-2 text-2xl font-bold leading-normal tracking-wide max-lg:text-xl">
          Recommendations
        </h3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {results.slice(0, 8).map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      </Container>
    </div>
  );
};
export default SimilarMovies;
