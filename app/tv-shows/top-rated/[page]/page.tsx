import TopRated from "@/components/top-rated/tv";
import Hero from "@/components/tv-shows/hero";
import { getTvGenres, getTopRatedTvs } from "@/utils/getters";

export default async function Page({
  searchParams,
  params,
}: {
  params: { page: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { results } = await getTopRatedTvs(Number(params.page));
  const { genres } = await getTvGenres();
  const tvShowIds = results.map((tvShow) => tvShow.id);

  return (
    <main>
      <Hero tvShowIds={tvShowIds} genres={genres} />
      <TopRated searchParams={searchParams} />
    </main>
  );
}
