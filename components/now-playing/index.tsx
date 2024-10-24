import { getNowPlayingMovies } from "@/utils/getters";
import Container from "../ui/container";
import PaginationComponent from "../shared/pagination";
import { RenderMovies } from "../shared/render";

const NowPlaying = async ({ params }: { params?: { page: string } }) => {
  const { results, total_pages } = await getNowPlayingMovies(
    Number(params?.page) || 1,
  );

  return (
    <section>
      <Container>
        <RenderMovies movies={results} />
        <PaginationComponent
          total_pages={total_pages}
          pathname="/movies/now-playing"
        />
      </Container>
    </section>
  );
};
export default NowPlaying;
