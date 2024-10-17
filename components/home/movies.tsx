import Container from "../ui/container";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { shuffleArray } from "@/utils/functions";
import { Movie as MovieInterface } from "@/types/globals";
import { RenderMovies } from "../shared/render";

const MoviesSection = ({ movies }: { movies: MovieInterface[] }) => {
  const shuffiedMovies = shuffleArray(movies).slice(0, 8);

  return (
    <section>
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold max-md:text-xl">Movies</h2>
          <Button
            size={"icon"}
            className="bg-primary-blue hover:bg-blue-900"
            asChild
          >
            <Link href="/movies">
              <ChevronRight size={20} />
            </Link>
          </Button>
        </div>
        <RenderMovies movies={shuffiedMovies} />
      </Container>
    </section>
  );
};
export default MoviesSection;
