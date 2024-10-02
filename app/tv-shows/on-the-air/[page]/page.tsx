import OnTheAir from "@/components/on-the-air";
import Hero from "@/components/tv-shows/hero";
import { getTvGenres, getOnTheAirTvs } from "@/utils/getters";

export default async function Page({
  searchParams,
  params,
}: {
  params: { page: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { results } = await getOnTheAirTvs(Number(params.page));
  const { genres } = await getTvGenres();
  const tvShowIds = results.map((tvShow) => tvShow.id);

  return (
    <main>
      <Hero tvShowIds={tvShowIds} genres={genres} />
      <OnTheAir searchParams={searchParams} />
    </main>
  );
}
