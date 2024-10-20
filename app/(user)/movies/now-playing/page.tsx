import NowPlaying from "@/components/now-playing";
import Hero from "@/components/shared/hero";
import { formatNumberWithCommas } from "@/utils/functions";
import { getGenres, getNowPlayingMovies } from "@/utils/getters";

export default async function Page() {
  const { results, total_results } = await getNowPlayingMovies(1);
  const { genres } = await getGenres();
  const movieIds = results.map((movie) => movie.id);

  return (
    <main>
      <Hero movieIds={movieIds} genres={genres} />
      <h2 className="my-8 flex flex-col gap-y-1 text-center text-xl font-bold leading-normal tracking-wide md:text-2xl">
        <span>Now Playing</span>
        <span className="text-sm text-medium-white">
          {formatNumberWithCommas(total_results)} Movies
        </span>
      </h2>
      <NowPlaying />
    </main>
  );
}
