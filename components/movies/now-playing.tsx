import Container from "../ui/container";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getNowPlayingMovies } from "@/utils/getters";
import { shuffleArray } from "@/utils/functions";
import { RenderMovies } from "../shared/render";

const NowPlaying = async () => {
  const { results } = await getNowPlayingMovies(1);

  const shuffledMovies = shuffleArray(results).slice(0, 8);

  return (
    <section>
      <Container className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="px-2 text-2xl font-bold max-md:px-1 max-md:text-xl">
            Now Playing
          </h2>
          <Button
            size={"icon"}
            className="mr-2 bg-primary-blue hover:bg-blue-900 max-md:mr-1"
            asChild
          >
            <Link href="/movies/now-playing">
              <ChevronRight size={20} />
            </Link>
          </Button>
        </div>
        <RenderMovies movies={shuffledMovies} />
      </Container>
    </section>
  );
};
export default NowPlaying;
