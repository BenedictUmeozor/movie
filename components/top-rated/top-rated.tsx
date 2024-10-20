import { getTopRatedMovies } from "@/utils/getters";
import Container from "../ui/container";
import PaginationComponent from "../shared/pagination";
import { RenderMovies } from "../shared/render";

const TopRated = async ({ params }: { params?: { page: string } }) => {
  const { results, total_pages } = await getTopRatedMovies(
    Number(params?.page) || 1,
  );

  return (
    <section>
      <Container>
        <RenderMovies movies={results} />
        <PaginationComponent
          total_pages={total_pages}
          pathname="/movies/top-rated"
        />
      </Container>
    </section>
  );
};
export default TopRated;
