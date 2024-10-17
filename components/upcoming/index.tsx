import { getGenres, getUpcomingMovies } from "@/utils/getters";
import Container from "../ui/container";
import PaginationComponent from "../shared/pagination";
import GenreSorter from "../shared/genre-sorter";
import { RenderMovies } from "../shared/render";

const Upcoming = async ({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params?: { page: string };
}) => {
  const { genres } = await getGenres();
  const { results, total_pages } = await getUpcomingMovies(
    Number(params?.page) || 1,
  );

  let filtered = results;

  const urlParams = (searchParams.genres as string)?.split(",") || [];
  const genreParams = urlParams.map((param) => parseInt(param));

  if (genreParams.length) {
    filtered = [...results].filter((movie) =>
      movie.genre_ids.some((genre) => genreParams.includes(genre)),
    );
  }

  return (
    <section>
      <Container>
        <GenreSorter genres={genres} pathname="/movies/upcoming" />
        <RenderMovies movies={filtered} />
        <PaginationComponent
          total_pages={total_pages}
          pathname="/movies/upcoming"
        />
      </Container>
    </section>
  );
};
export default Upcoming;
