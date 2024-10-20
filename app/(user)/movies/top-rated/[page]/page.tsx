import Hero from "@/components/shared/hero";
import TopRated from "@/components/top-rated/top-rated";
import { getGenres, getTopRatedMovies } from "@/utils/getters";

export const generateStaticParams = async () => {
  return [];
};

export default async function Page({ params }: { params: { page: string } }) {
  const { results } = await getTopRatedMovies(Number(params.page));
  const { genres } = await getGenres();
  const movieIds = results.map((movie) => movie.id);

  return (
    <main>
      <Hero movieIds={movieIds} genres={genres} />
      <TopRated params={params} />
    </main>
  );
}
