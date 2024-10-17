import Hero from "@/components/shared/hero";
import MoviesSection from "@/components/home/movies";
import SeriesSection from "@/components/home/series";
import { getGenres, getMovies } from "@/utils/getters";

export default async function Page() {
  const { results } = await getMovies(1);
  const movieIds = results.map((movie) => movie.id);
  const { genres } = await getGenres();

  return (
    <main>
      <Hero movieIds={movieIds} genres={genres} />
      <MoviesSection movies={results} />
      <SeriesSection />
    </main>
  );
}
