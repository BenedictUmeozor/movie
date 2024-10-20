import SimilarTvShows from "@/components/tv-show/similar";
import Cast from "@/components/shared/cast/cast";
import Companies from "@/components/shared/companies";
import Banner from "@/components/tv-show/banner";
import Seasons from "@/components/tv-show/seasons";
import { getSingleTvShow } from "@/utils/getters";
import { notFound } from "next/navigation";
import Reviews from "@/components/tv-show/reviews";
import Videos from "@/components/tv-show/videos";
import { Metadata } from "next";

export async function generateStaticParams() {
  return [];
}

export const generateMetadata = async ({
  params,
}: {
  params: { showId: string };
}): Promise<Metadata> => {
  const tvShow = await getSingleTvShow(Number(params.showId));

  return {
    title: `${tvShow.name} - Movie Empire`,
    description: tvShow.overview,
    openGraph: {
      title: `${tvShow.name} - Movie Empire`,
      description: tvShow.overview,
      url: `https://movie-empire.vercel.app/movie/${params.showId}`,
      images: [
        {
          url: tvShow.poster_path,
        },
      ],
    },
    metadataBase: new URL(process.env.IMG_URL),
  };
};

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
      <Reviews tmdbId={parseInt(params.showId)} />
      <SimilarTvShows tvShowId={params.showId} />
    </main>
  );
}
