import Container from "../ui/container";
import PaginationComponent from "../shared/pagination";
import { TvShow } from "@/types/globals";
import { RenderTvShows } from "../shared/render";

const SearchResult = async ({
  results,
  total_pages,
  params,
}: {
  params: { query: string };
  total_pages: number;
  results: TvShow[];
}) => {
  return (
    <section>
      <Container>
        <h2 className="my-8 text-center text-xl font-bold leading-normal tracking-wide md:text-2xl">
          Search Results For{" "}
          <span className="italic text-medium-white">{params.query}</span>
        </h2>
        <RenderTvShows tvShows={results} />
        <PaginationComponent
          total_pages={total_pages}
          pathname={`/search/tv-shows/${params.query}`}
        />
      </Container>
    </section>
  );
};
export default SearchResult;
