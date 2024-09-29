import Banner from "@/components/movie/banner";
import Cast from "@/components/movie/cast";
import Companies from "@/components/movie/companies";
import Reviews from "@/components/movie/reviews";
import { getSingleMovie } from "@/utils/getters";

export async function generateStaticParams() {
  return [];
}

export default async function Page({
  params,
}: {
  params: { movieId: string };
}) {
  const movie = await getSingleMovie(Number(params.movieId));

  return (
    <main>
      <Banner movie={movie} />
      <Companies companies={movie.production_companies} />
      <Cast cast={movie.credits.cast} />
      <Reviews />
    </main>
  );
}
