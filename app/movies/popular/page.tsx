import Popular from "@/components/popular/popular";
import Hero from "@/components/shared/hero";
import { getGenres, getPopularMovies } from "@/utils/getters";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { results } = await getPopularMovies(1);
  const { genres } = await getGenres();
  const movieIds = results.map((movie) => movie.id);

  return (
    <main>
      <Hero movieIds={movieIds} genres={genres} />
      <Popular searchParams={searchParams} />
    </main>
  );
}
