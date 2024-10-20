import Hero from "@/components/tv-shows/hero";
import PaginationComponent from "@/components/shared/pagination";
import { RenderTvShows } from "@/components/shared/render";
import Container from "@/components/ui/container";
import { getTvGenres, getTvShows } from "@/utils/getters";
import { formatNumberWithCommas } from "@/utils/functions";

export const generateStaticParams = async () => {
  return [];
};

export default async function Page({
  params,
}: {
  params: { genreId: string; page: string };
}) {
  const { results, total_pages, total_results } = await getTvShows(
    Number(params.page),
    parseInt(params.genreId),
  );
  const tvShowsIds = results.map((tvShow) => tvShow.id);
  const { genres } = await getTvGenres();

  const genre = genres.find((genre) => genre.id === parseInt(params.genreId));

  return (
    <main>
      <Hero genres={genres} tvShowIds={tvShowsIds} />
      <h2 className="my-8 flex flex-col gap-y-1 text-center text-xl font-bold leading-normal tracking-wide md:text-2xl">
        <span>{genre?.name}</span>
        <span className="text-sm text-medium-white">
          {formatNumberWithCommas(total_results)} Movies
        </span>
      </h2>
      <section>
        <Container>
          <RenderTvShows tvShows={results} />
          <PaginationComponent
            total_pages={total_pages}
            pathname={`/tv-shows/genres/${params.genreId}/page`}
          />
        </Container>
      </section>
    </main>
  );
}
