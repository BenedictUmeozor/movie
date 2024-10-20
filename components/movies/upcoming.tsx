import Container from "../ui/container";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getUpcomingMovies } from "@/utils/getters";
import { shuffleArray } from "@/utils/functions";
import { RenderMovies } from "../shared/render";

const Upcoming = async () => {
  const { results } = await getUpcomingMovies(1);

  const shuffledMovies = shuffleArray(results).slice(0, 8);

  return (
    <section>
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold md:text-xl">Upcoming</h2>
          <Button
            size={"icon"}
            className="bg-primary-blue hover:bg-blue-900"
            asChild
          >
            <Link href="/movies/upcoming">
              <ChevronRight />
            </Link>
          </Button>
        </div>
        <RenderMovies movies={shuffledMovies} />
      </Container>
    </section>
  );
};
export default Upcoming;
