import Discover from "@/components/movies/discover";
import Hero from "@/components/movies/hero";
import NowPlaying from "@/components/movies/now-playing";
import Popular from "@/components/movies/popular";
import TopRated from "@/components/movies/top-rated";
import Upcoming from "@/components/movies/upcoming";
import { getGenres, getMovies } from "@/utils/getters";

export default async function Page() {
  const { results } = await getMovies(1);
  const movieIds = results.map((movie) => movie.id);
  const { genres } = await getGenres();

  return (
    <main>
      <Hero movieIds={movieIds} genres={genres} />
      <Discover movies={results} />
      <Popular />
      <NowPlaying />
      <TopRated />
      <Upcoming />
    </main>
  );
}
