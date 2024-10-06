import AiringToday from "@/components/airing-today";
import Hero from "@/components/tv-shows/hero";
import { getTvGenres, getAiringTodayTvs } from "@/utils/getters";

export default async function Page({
  searchParams,
  params,
}: {
  params: { page: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { results } = await getAiringTodayTvs(Number(params.page));
  const { genres } = await getTvGenres();
  const tvShowIds = results.map((tvShow) => tvShow.id);

  return (
    <main>
      <Hero tvShowIds={tvShowIds} genres={genres} />
      <AiringToday searchParams={searchParams} />
    </main>
  );
}
