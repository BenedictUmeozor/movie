import Container from "../ui/container";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { getTopRatedMovies } from "@/utils/getters";
import { shuffleArray } from "@/utils/functions";
import Movie from "../ui/movie";

const TopRated = async () => {
  const { results } = await getTopRatedMovies(1);

  const shuffledMovies = shuffleArray(results).slice(0, 8);

  return (
    <section className="pt-12">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold md:text-xl">Top Rated</h2>
          <Button size={"icon"} className="bg-primary-blue hover:bg-blue-900" asChild>
            <Link href="/movies/top-rated">
              <ChevronRight />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {shuffledMovies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      </Container>
    </section>
  );
};
export default TopRated;
