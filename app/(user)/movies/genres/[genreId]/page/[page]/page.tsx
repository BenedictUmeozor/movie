import Hero from "@/components/shared/hero";
import PaginationComponent from "@/components/shared/pagination";
import { RenderMovies } from "@/components/shared/render";
import Container from "@/components/ui/container";
import { formatNumberWithCommas } from "@/utils/functions";
import { getGenres, getMovies } from "@/utils/getters";

export const generateMetadata = async ({
  params,
}: {
  params: { genreId: string };
}) => {
  const { genres } = await getGenres();
  const genre = genres.find((genre) => genre.id === parseInt(params.genreId));
  return {
    title: `Movies | ${genre?.name}`,
  };
};

export default async function Page({
  params,
}: {
  params: { genreId: string; page: string };
}) {
  const { results, total_pages, total_results } = await getMovies(
    Number(params.page),
    parseInt(params.genreId),
  );
  const movieIds = results.map((movie) => movie.id);
  const { genres } = await getGenres();

  const genre = genres.find((genre) => genre.id === parseInt(params.genreId));

  return (
    <main>
      <Hero genres={genres} movieIds={movieIds} />
      <h2 className="my-8 flex flex-col gap-y-1 text-center text-xl font-bold leading-normal tracking-wide md:text-2xl">
        <span>{genre?.name}</span>
        <span className="text-sm text-medium-white">
          {formatNumberWithCommas(total_results)} Movies
        </span>
      </h2>
      <section>
        <Container>
          <RenderMovies movies={results} />
          <PaginationComponent
            total_pages={total_pages}
            pathname={`/movies/genres/${params.genreId}/page`}
          />
        </Container>
      </section>
    </main>
  );
}
