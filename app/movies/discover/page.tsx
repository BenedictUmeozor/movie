import Discover from "@/components/discover/discover";
import Hero from "@/components/shared/hero";
import { getGenres, getMovies } from "@/utils/getters";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { results } = await getMovies(1);
  const { genres } = await getGenres();
  const movieIds = results.map((movie) => movie.id);

  return (
    <main>
      <Hero movieIds={movieIds} genres={genres} />
      <Discover searchParams={searchParams} />
    </main>
  );
}
