import { getUpcomingMovies } from "@/utils/getters";
import Container from "../ui/container";
import PaginationComponent from "../shared/pagination";
import { RenderMovies } from "../shared/render";

const Upcoming = async ({ params }: { params?: { page: string } }) => {
  const { results, total_pages } = await getUpcomingMovies(
    Number(params?.page) || 1,
  );

  return (
    <section>
      <Container>
        <RenderMovies movies={results} />
        <PaginationComponent
          total_pages={total_pages}
          pathname="/movies/upcoming"
        />
      </Container>
    </section>
  );
};
export default Upcoming;
