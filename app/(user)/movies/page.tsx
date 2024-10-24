import Discover from "@/components/movies/discover";
import NowPlaying from "@/components/movies/now-playing";
import Popular from "@/components/movies/popular";
import TopRated from "@/components/movies/top-rated";
import Upcoming from "@/components/movies/upcoming";
import Hero from "@/components/shared/hero";
import { getGenres, getMovies } from "@/utils/getters";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies - Movie Empire",
};

export default async function Page() {
  const { results } = await getMovies(1);
  const movieIds = results.map((movie) => movie.id);
  const { genres } = await getGenres();

  return (
    <main className="space-y-16">
      <Hero movieIds={movieIds} genres={genres} />
      <Discover movies={results} />
      <Popular />
      <NowPlaying />
      <TopRated />
      <Upcoming />
    </main>
  );
}
