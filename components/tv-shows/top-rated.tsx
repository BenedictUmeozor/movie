import Container from "../ui/container";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { shuffleArray } from "@/utils/functions";
import { getTopRatedTvs } from "@/utils/getters";
import { RenderTvShows } from "../shared/render";

const TopRated = async () => {
  const { results } = await getTopRatedTvs(1);

  const shuffledTvShows = shuffleArray(results).slice(0, 8);

  return (
    <section>
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold max-md:text-xl">Top Rated</h2>
          <Button
            size={"icon"}
            className="bg-primary-blue hover:bg-blue-900"
            asChild
          >
            <Link href="/tv-shows/top-rated">
              <ChevronRight size={20} />
            </Link>
          </Button>
        </div>
        <RenderTvShows tvShows={shuffledTvShows} />
      </Container>
    </section>
  );
};
export default TopRated;
