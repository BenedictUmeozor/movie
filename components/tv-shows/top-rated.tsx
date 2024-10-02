import Container from "../ui/container";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { shuffleArray } from "@/utils/functions";
import { getTopRatedTvs } from "@/utils/getters";
import TVShow from "../ui/tvshow";

const TopRated = async () => {
  const { results } = await getTopRatedTvs(1);

  const shuffledTvShows = shuffleArray(results).slice(0, 8);

  return (
    <section className="pt-12">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold max-md:text-xl">Top Rated</h2>
          <Button size={"icon"} className="bg-primary-blue hover:bg-blue-900">
            <Link href="/tv-shows/top-rated">
              <ChevronRight size={20} />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {shuffledTvShows.map((tvShow) => (
            <TVShow key={tvShow.id} tvShow={tvShow} />
          ))}
        </div>
      </Container>
    </section>
  );
};
export default TopRated;
