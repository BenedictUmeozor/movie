import Container from "../ui/container";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { shuffleArray } from "@/utils/functions";
import Movie from "../ui/movie";
import { Movie as MovieInterface } from "@/types/globals";

const MoviesSection = ({ movies }: { movies: MovieInterface[] }) => {
  const shuffiedMovies = shuffleArray(movies).slice(0, 8);

  return (
    <section className="pt-12">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold max-md:text-xl">Movies</h2>
          <Button size={"icon"} className="bg-primary-blue hover:bg-blue-900">
            <Link href="/movies">
              <ChevronRight size={20} />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {shuffiedMovies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      </Container>
    </section>
  );
};
export default MoviesSection;
