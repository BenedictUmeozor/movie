import Container from "../ui/container";
import PaginationComponent from "../shared/pagination";
import { Movie as MovieInterface } from "@/types/globals";
import { RenderMovies } from "../shared/render";
import { formatNumberWithCommas } from "@/utils/functions";

const SearchResult = async ({
  results,
  total_pages,
  params,
  total_results,
}: {
  params: { query: string };
  total_pages: number;
  results: MovieInterface[];
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
        <RenderMovies movies={results} />
        <PaginationComponent
          total_pages={total_pages}
          pathname={`/search/movies/${params.query}`}
        />
      </Container>
    </section>
  );
};
export default SearchResult;
