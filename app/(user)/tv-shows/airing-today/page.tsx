import AiringToday from "@/components/airing-today";
import Hero from "@/components/tv-shows/hero";
import { getTvGenres, getAiringTodayTvs } from "@/utils/getters";

export default async function Page() {
  const { results } = await getAiringTodayTvs(1);
  const { genres } = await getTvGenres();
  const tvShowIds = results.map((tvShow) => tvShow.id);

  return (
    <main>
      <Hero tvShowIds={tvShowIds} genres={genres} />
      <AiringToday />
    </main>
  );
}
