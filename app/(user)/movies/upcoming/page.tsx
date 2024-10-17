import Hero from "@/components/shared/hero";
import Upcoming from "@/components/upcoming";
import { getGenres, getUpcomingMovies } from "@/utils/getters";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { results } = await getUpcomingMovies(1);
  const { genres } = await getGenres();
  const movieIds = results.map((movie) => movie.id);

  return (
    <main>
      <Hero movieIds={movieIds} genres={genres} />
      <Upcoming searchParams={searchParams} />
    </main>
  );
}
