import Banner from "@/components/movie/banner";
import Reviews from "@/components/movie/reviews";
import SimilarMovies from "@/components/movie/similar-movies";
import Videos from "@/components/movie/videos";
import Cast from "@/components/shared/cast/cast";
import Companies from "@/components/shared/companies";
import { getSingleMovie } from "@/utils/getters";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [];
}

export default async function Page({
  params,
}: {
  params: { movieId: string };
}) {
  const movie = await getSingleMovie(Number(params.movieId));

  if (!movie) {
    notFound();
  }

  return (
    <main className="py-8">
      <Banner movie={movie} />
      <Videos movieId={params.movieId} />
      <Companies companies={movie.production_companies} />
      <Cast cast={movie.credits.cast} title={movie.title} />
      <Reviews tmdbId={parseInt(params.movieId)} />
      <SimilarMovies movieId={params.movieId} />
    </main>
  );
}
