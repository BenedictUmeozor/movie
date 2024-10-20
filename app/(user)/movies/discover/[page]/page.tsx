import Discover from "@/components/discover/movie";
import Hero from "@/components/shared/hero";
import { getGenres, getMovies } from "@/utils/getters";

export const generateStaticParams = async () => {
  return [];
};

export default async function Page({ params }: { params: { page: string } }) {
  const { results } = await getMovies(Number(params.page));
  const { genres } = await getGenres();
  const movieIds = results.map((movie) => movie.id);

  return (
    <main>
      <Hero movieIds={movieIds} genres={genres} />
      <Discover params={params} />
    </main>
  );
}
