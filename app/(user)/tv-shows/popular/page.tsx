import Popular from "@/components/popular/tv";
import Hero from "@/components/tv-shows/hero";
import { getTvGenres, getPopularTvs } from "@/utils/getters";

export default async function Page() {
  const { results } = await getPopularTvs(1);
  const { genres } = await getTvGenres();
  const tvShowIds = results.map((tvShow) => tvShow.id);

  return (
    <main>
      <Hero tvShowIds={tvShowIds} genres={genres} />
      <Popular />
    </main>
  );
}
