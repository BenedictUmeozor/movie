import NowPlaying from "@/components/now-playing";
import Hero from "@/components/shared/hero";
import { getGenres, getNowPlayingMovies } from "@/utils/getters";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { results } = await getNowPlayingMovies(1);
  const { genres } = await getGenres();
  const movieIds = results.map((movie) => movie.id);

  return (
    <main>
      <Hero movieIds={movieIds} genres={genres} />
      <NowPlaying searchParams={searchParams} />
    </main>
  );
}
