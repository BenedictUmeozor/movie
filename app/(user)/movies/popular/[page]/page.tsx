import Popular from "@/components/popular/popular";
import Hero from "@/components/shared/hero";
import { formatNumberWithCommas } from "@/utils/functions";
import { getGenres, getPopularMovies } from "@/utils/getters";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Popular Movies - Movie Empire",
};


export default async function Page({ params }: { params: { page: string } }) {
  const { results, total_results } = await getPopularMovies(
    Number(params.page),
  );
  const { genres } = await getGenres();
  const movieIds = results.map((movie) => movie.id);

  return (
    <main>
      <Hero movieIds={movieIds} genres={genres} />
      <h2 className="my-8 flex flex-col gap-y-1 text-center text-xl font-bold leading-normal tracking-wide md:text-2xl">
        <span>Popular</span>
        <span className="text-sm text-medium-white">
          {formatNumberWithCommas(total_results)} Movies
        </span>
      </h2>
      <Popular params={params} />
    </main>
  );
}
