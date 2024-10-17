import Container from "../ui/container";
import PaginationComponent from "../shared/pagination";
import GenreSorter from "../shared/genre-sorter";
import { Genre, TvShow } from "@/types/globals";
import { RenderTvShows } from "../shared/render";

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
    <section>
      <Container>
        <GenreSorter
          genres={genres}
          pathname={`/search/tv-shows/${params.query}`}
        />
        <RenderTvShows tvShows={filtered} />
        <PaginationComponent
          total_pages={total_pages}
          pathname={`/search/tv-shows/${params.query}`}
        />
      </Container>
    </section>
  );
};
export default SearchResult;
