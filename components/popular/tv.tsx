import { getPopularTvs } from "@/utils/getters";
import Container from "../ui/container";
import PaginationComponent from "../shared/pagination";
import { RenderTvShows } from "../shared/render";

const Popular = async ({ params }: { params?: { page: string } }) => {
  const { results, total_pages } = await getPopularTvs(
    Number(params?.page) || 1,
  );

  return (
    <section>
      <Container>
        <RenderTvShows tvShows={results} />
        <PaginationComponent
          total_pages={total_pages}
          pathname="/tv-shows/popular"
        />
      </Container>
    </section>
  );
};
export default Popular;
