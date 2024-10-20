import Hero from "@/components/shared/hero";
import TopRated from "@/components/top-rated/top-rated";
import { getGenres, getTopRatedMovies } from "@/utils/getters";

export default async function Page() {
  const { results } = await getTopRatedMovies(1);
  const { genres } = await getGenres();
  const movieIds = results.map((movie) => movie.id);

  return (
    <main>
      <Hero movieIds={movieIds} genres={genres} />
      <TopRated />
    </main>
  );
}
