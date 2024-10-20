import { getOnTheAirTvs } from "@/utils/getters";
import Container from "../ui/container";
import PaginationComponent from "../shared/pagination";
import { RenderTvShows } from "../shared/render";

const OnTheAir = async ({ params }: { params?: { page: string } }) => {
  const { results, total_pages } = await getOnTheAirTvs(
    Number(params?.page) || 1,
  );

  return (
    <section>
      <Container>
        <h2 className="my-8 text-center text-xl font-bold leading-normal tracking-wide md:text-2xl">
          On The Air
        </h2>
        <RenderTvShows tvShows={results} />
        <PaginationComponent
          total_pages={total_pages}
          pathname="/tv-shows/on-the-air"
        />
      </Container>
    </section>
  );
};
export default OnTheAir;
