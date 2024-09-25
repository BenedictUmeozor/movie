import Discover from "@/components/discover/discover";
import Hero from "@/components/shared/hero";
import { getGenres, getMovies } from "@/utils/getters";

export const generateStaticParams = async () => {
  const { total_pages } = await getMovies();

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
  const { results } = await getMovies(Number(params.page));
  const { genres } = await getGenres();
  const movieIds = results.map((movie) => movie.id);

  return (
    <main>
      <Hero movieIds={movieIds} genres={genres} />
      <Discover searchParams={searchParams} params={params} />
    </main>
  );
}
