import { getPopularTvs, getTvGenres } from "@/utils/getters";
import Container from "../ui/container";
import GenreSorter from "../shared/genre-sorter";
import PaginationComponent from "../shared/pagination";
import TVShow from "../ui/tvshow";

const Popular = async ({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params?: { page: string };
}) => {
  const { genres } = await getTvGenres();
  const { results, total_pages } = await getPopularTvs(
    Number(params?.page) || 1,
  );

  let filtered = results;

  const urlParams = (searchParams.genres as string)?.split(",") || [];
  const genreParams = urlParams.map((param) => parseInt(param));

  if (genreParams.length) {
    filtered = [...results].filter((tvShow) =>
      tvShow.genre_ids.some((genre) => genreParams.includes(genre)),
    );
  }

  return (
    <section className="pt-12">
      <Container>
        <GenreSorter genres={genres} pathname="/tv-shows/popular" />
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((tvShow) => (
            <TVShow key={tvShow.id} tvShow={tvShow} />
          ))}
        </div>
        <PaginationComponent
          total_pages={total_pages}
          pathname="/tv-shows/popular"
        />
      </Container>
    </section>
  );
};
export default Popular;
