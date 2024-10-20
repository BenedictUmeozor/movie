import { getMovies } from "@/utils/getters";
import Container from "../ui/container";
import PaginationComponent from "../shared/pagination";
import { RenderMovies } from "../shared/render";

const Discover = async ({ params }: { params?: { page: string } }) => {
  const { results, total_pages } = await getMovies(Number(params?.page) || 1);

  return (
    <section>
      <Container>
        <RenderMovies movies={results} />
        <PaginationComponent
          total_pages={total_pages}
          pathname="/movies/discover"
        />
      </Container>
    </section>
  );
};
export default Discover;
