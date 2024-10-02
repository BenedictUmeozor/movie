import Container from "../ui/container";
import Movie from "../ui/movie";
import PaginationComponent from "../shared/pagination";
import GenreSorter from "../shared/genre-sorter";
import { Genre, Movie as MovieInterface } from "@/types/globals";

const SearchResult = async ({
  searchParams,
  genres,
  results,
  total_pages,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { query: string };
  genres: Genre[];
  total_pages: number;
  results: MovieInterface[];
}) => {
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
        <GenreSorter
          genres={genres}
          pathname={`/search/movies/${params.query}`}
        />
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
        <PaginationComponent
          total_pages={total_pages}
          pathname={`/search/movies/${params.query}`}
        />
      </Container>
    </section>
  );
};
export default SearchResult;
