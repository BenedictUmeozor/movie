import Container from "../ui/container";
import PaginationComponent from "../shared/pagination";
import { TvShow } from "@/types/globals";
import { RenderTvShows } from "../shared/render";
import { formatNumberWithCommas } from "@/utils/functions";

const SearchResult = async ({
  results,
  total_pages,
  params,
  total_results,
}: {
  params: { query: string };
  total_pages: number;
  results: TvShow[];
  total_results: number;
}) => {
  return (
    <section>
      <Container>
        <div className="my-8 space-y-1 text-center text-xl font-bold leading-normal tracking-wide md:text-2xl">
          <p>
            Search Results For{" "}
            <span className="italic text-medium-white">{params.query}</span>
          </p>
          <p className="text-sm text-medium-white">
            {formatNumberWithCommas(total_results)} results
          </p>
        </div>
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
