import Container from "../ui/container";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { shuffleArray } from "@/utils/functions";
import { getPopularTvs } from "@/utils/getters";
import { RenderTvShows } from "../shared/render";

const Popular = async () => {
  const { results } = await getPopularTvs(1);

  const shuffledTvShows = shuffleArray(results).slice(0, 8);

  return (
    <section>
      <Container className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="px-2 text-2xl font-bold max-md:px-1 max-md:text-xl">
            Popular
          </h2>
          <Button
            size={"icon"}
            className="mr-2 bg-primary-blue hover:bg-blue-900 max-md:mr-1"
            asChild
          >
            <Link href="/tv-shows/popular">
              <ChevronRight size={20} />
            </Link>
          </Button>
        </div>
        <RenderTvShows tvShows={shuffledTvShows} />
      </Container>
    </section>
  );
};
export default Popular;
