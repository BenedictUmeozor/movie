import SimilarTvShows from "@/components/tv-show/similar";
import Cast from "@/components/shared/cast/cast";
import Companies from "@/components/shared/companies";
import Banner from "@/components/tv-show/banner";
import Seasons from "@/components/tv-show/seasons";
import { getSingleTvShow } from "@/utils/getters";
import { notFound } from "next/navigation";
import Reviews from "@/components/tv-show/reviews";
import Videos from "@/components/tv-show/videos";

export async function generateStaticParams() {
  return [];
}

export default async function Page({ params }: { params: { showId: string } }) {
  const tvShow = await getSingleTvShow(Number(params.showId));

  if (!tvShow) {
    notFound();
  }

  return (
    <main>
      <Banner tvShow={tvShow} />
      <Seasons seasons={tvShow.seasons} tvShowId={params.showId} />
      <Videos tvShowId={params.showId} />
      <Companies companies={tvShow.production_companies} />
      <Cast cast={tvShow.credits.cast} title={tvShow.name} />
      <Reviews />
      <SimilarTvShows tvShowId={params.showId} />
    </main>
  );
}
