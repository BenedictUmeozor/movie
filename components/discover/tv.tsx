import { getTvGenres, getTvShows } from "@/utils/getters";
import Container from "../ui/container";
import GenreSorter from "../shared/genre-sorter";
import PaginationComponent from "../shared/pagination";
import { RenderTvShows } from "../shared/render";

const Discover = async ({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params?: { page: string };
}) => {
  const { genres } = await getTvGenres();
  const { results, total_pages } = await getTvShows(Number(params?.page) || 1);

  let filtered = results;

  const urlParams = (searchParams.genres as string)?.split(",") || [];
  const genreParams = urlParams.map((param) => parseInt(param));

  if (genreParams.length) {
    filtered = [...results].filter((tvShow) =>
      tvShow.genre_ids.some((genre) => genreParams.includes(genre)),
    );
  }

  return (
    <section>
      <Container>
        <GenreSorter genres={genres} pathname="/tv-shows/discover" />
        <RenderTvShows tvShows={filtered} />
        <PaginationComponent
          total_pages={total_pages}
          pathname="/tv-shows/discover"
        />
      </Container>
    </section>
  );
};
export default Discover;
