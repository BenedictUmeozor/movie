import TopRated from "@/components/top-rated/tv";
import Hero from "@/components/tv-shows/hero";
import { getTvGenres, getTopRatedTvs } from "@/utils/getters";

export default async function Page() {
  const { results } = await getTopRatedTvs(1);
  const { genres } = await getTvGenres();
  const tvShowIds = results.map((tvShow) => tvShow.id);

  return (
    <main>
      <Hero tvShowIds={tvShowIds} genres={genres} />
      <TopRated />
    </main>
  );
}
