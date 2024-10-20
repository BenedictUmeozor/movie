import Discover from "@/components/discover/movie";
import Hero from "@/components/shared/hero";
import { getGenres, getMovies } from "@/utils/getters";

export default async function Page() {
  const { results } = await getMovies(1);
  const { genres } = await getGenres();
  const movieIds = results.map((movie) => movie.id);

  return (
    <main>
      <Hero movieIds={movieIds} genres={genres} />
      <Discover />
    </main>
  );
}
