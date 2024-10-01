import Popular from "@/components/popular/popular";
import Hero from "@/components/shared/hero";
import { getGenres, getPopularMovies } from "@/utils/getters";

export const generateStaticParams = async () => {
  return [];
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { page: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { results } = await getPopularMovies(Number(params.page));
  const { genres } = await getGenres();
  const movieIds = results.map((movie) => movie.id);

  return (
    <main>
      <Hero movieIds={movieIds} genres={genres} />
      <Popular searchParams={searchParams} params={params} />
    </main>
  );
}
