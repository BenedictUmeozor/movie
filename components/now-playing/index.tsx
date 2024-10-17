import { getGenres, getNowPlayingMovies } from "@/utils/getters";
import Container from "../ui/container";
import PaginationComponent from "../shared/pagination";
import GenreSorter from "../shared/genre-sorter";
import { RenderMovies } from "../shared/render";

const NowPlaying = async ({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params?: { page: string };
}) => {
  const { genres } = await getGenres();
  const { results, total_pages } = await getNowPlayingMovies(
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
        <GenreSorter genres={genres} pathname="/movies/now-playing" />
        <RenderMovies movies={filtered} />
        <PaginationComponent
          total_pages={total_pages}
          pathname="/movies/now-playing"
        />
      </Container>
    </section>
  );
};
export default NowPlaying;
