import AiringToday from "@/components/tv-shows/airing-today";
import Discover from "@/components/tv-shows/discover";
import Hero from "@/components/tv-shows/hero";
import OnTheAir from "@/components/tv-shows/on-the-air";
import Popular from "@/components/tv-shows/popular";
import TopRated from "@/components/tv-shows/top-rated";
import { getTvGenres, getTvShows } from "@/utils/getters";

export default async function Page() {
  const { results } = await getTvShows();
  const { genres } = await getTvGenres();
  const tvShowIds = results.map((tvShow) => tvShow.id);

  return (
    <main>
      <Hero genres={genres} tvShowIds={tvShowIds} />
      <Discover tvShows={results} />
      <Popular />
      <TopRated />
      <OnTheAir />
      <AiringToday />
    </main>
  );
}
