import Discover from "@/components/discover/movie";
import Hero from "@/components/shared/hero";
import { formatNumberWithCommas } from "@/utils/functions";
import { getGenres, getMovies } from "@/utils/getters";
import { Metadata } from "next";

export const generateStaticParams = async () => {
  return [];
};

export const metadata: Metadata = {
  title: "Discover - Movie Empire",
};

export default async function Page({ params }: { params: { page: string } }) {
  const { results, total_results } = await getMovies(Number(params.page));
  const { genres } = await getGenres();
  const movieIds = results.map((movie) => movie.id);

  return (
    <main>
      <Hero movieIds={movieIds} genres={genres} />
      <Hero movieIds={movieIds} genres={genres} />
      <h2 className="my-8 flex flex-col gap-y-1 text-center text-xl font-bold leading-normal tracking-wide md:text-2xl">
        <span>Discover</span>
        <span className="text-sm text-medium-white">
          {formatNumberWithCommas(total_results)} Movies
        </span>
      </h2>
      <Discover params={params} />
    </main>
  );
}
