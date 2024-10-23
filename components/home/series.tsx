import Container from "../ui/container";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getTvShows } from "@/utils/getters";
import { shuffleArray } from "@/utils/functions";
import { RenderTvShows } from "../shared/render";

const SeriesSection = async () => {
  const { results } = await getTvShows();

  const series = shuffleArray(results).slice(0, 8);

  return (
    <section>
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="px-2 text-2xl font-bold max-md:px-1 max-md:text-xl">
            TV Shows
          </h2>
          <Button
            size={"icon"}
            className="mr-2 bg-primary-blue hover:bg-blue-900 max-md:mr-1"
            asChild
          >
            <Link href="/tv-shows">
              <ChevronRight size={20} />
            </Link>
          </Button>
        </div>
        <RenderTvShows tvShows={series} />
      </Container>
    </section>
  );
};
export default SeriesSection;
