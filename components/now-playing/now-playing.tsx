import { getGenres, getNowPlayingMovies } from "@/utils/getters";
import Container from "../ui/container";
import Movie from "../ui/movie";
import PaginationComponent from "../shared/pagination";
import GenreSorter from "../shared/genre-sorter";

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
    <section className="pt-12">
      <Container>
        <GenreSorter genres={genres} pathname="/movies/now-playing" />
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
        <PaginationComponent
          total_pages={total_pages}
          pathname="/movies/now-playing"
        />
      </Container>
    </section>
  );
};
export default NowPlaying;
