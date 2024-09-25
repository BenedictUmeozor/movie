import Hero from "@/components/shared/hero";
import TopRated from "@/components/top-rated/top-rated";
import { getGenres, getTopRatedMovies } from "@/utils/getters";

export const generateStaticParams = async () => {
  const { total_pages } = await getTopRatedMovies();

  const pageNumbers = [];

  for (let i = 1; i <= total_pages; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers.map((page) => ({
    page: page.toString(),
  }));
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { page: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { results } = await getTopRatedMovies(Number(params.page));
  const { genres } = await getGenres();
  const movieIds = results.map((movie) => movie.id);

  return (
    <main>
      <Hero movieIds={movieIds} genres={genres} />
      <TopRated searchParams={searchParams} params={params} />
    </main>
  );
}
