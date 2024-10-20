import Discover from "@/components/discover/tv";
import Hero from "@/components/tv-shows/hero";
import { getTvGenres, getTvShows } from "@/utils/getters";

export default async function Page({
  params,
  searchParams,
}: {
  params: { page: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { results } = await getTvShows(Number(params.page));
  const { genres } = await getTvGenres();
  const tvShowIds = results.map((tvShow) => tvShow.id);

  return (
    <main>
      <Hero tvShowIds={tvShowIds} genres={genres} />
      <Discover />
    </main>
  );
}
