import Container from "../ui/container";
import PaginationComponent from "../shared/pagination";
import GenreSorter from "../shared/genre-sorter";
import { Genre, TvShow } from "@/types/globals";
import TVShow from "../ui/tvshow";

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
  results: TvShow[];
}) => {
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
        <GenreSorter
          genres={genres}
          pathname={`/search/tv-shows/${params.query}`}
        />
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((tvShow) => (
            <TVShow key={tvShow.id} tvShow={tvShow} />
          ))}
        </div>
        <PaginationComponent
          total_pages={total_pages}
          pathname={`/search/tv-shows/${params.query}`}
        />
      </Container>
    </section>
  );
};
export default SearchResult;
