import Popular from "@/components/popular/tv";
import Hero from "@/components/tv-shows/hero";
import { getTvGenres, getPopularTvs } from "@/utils/getters";

export default async function Page({ params }: { params: { page: string } }) {
  const { results } = await getPopularTvs(Number(params.page));
  const { genres } = await getTvGenres();
  const tvShowIds = results.map((tvShow) => tvShow.id);

  return (
    <main>
      <Hero tvShowIds={tvShowIds} genres={genres} />
      <Popular />
    </main>
  );
}
