import Banner from "@/components/episode/banner";
import Reviews from "@/components/episode/reviews";
import Videos from "@/components/episode/videos";
import Cast from "@/components/shared/cast/cast";
import { TVShowController } from "@/types/tvshow";
import { getSingleTvShow } from "@/utils/getters";
import { Metadata } from "next";

import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  return [];
};

export const generateMetadata = async ({
  params,
}: {
  params: { showId: string; seasonId: string; episodeId: string };
}): Promise<Metadata> => {
  const tvShow = await getSingleTvShow(Number(params.showId));

  return {
    title: `Episode ${params.episodeId} - Season ${params.seasonId} - ${tvShow.name} - Movie Empire`,
    description: tvShow.overview,
    openGraph: {
      title: `Episode ${params.episodeId} - Season ${params.seasonId} -${tvShow.name} - Movie Empire`,
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

const getSeasonInfo = async ({
  seasonId,
  showId,
  episodeId,
}: {
  showId: string;
  seasonId: string;
  episodeId: string;
}): Promise<TVShowController.SingleEpisode> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/tv/${showId}/season/${seasonId}/episode/${episodeId}?append_to_response=credits&api_key=${process.env.API_KEY}`,
  );

  return response.json();
};

export default async function Page({
  params,
}: {
  params: { showId: string; seasonId: string; episodeId: string };
}) {
  const details = await getSeasonInfo({
    seasonId: params.seasonId,
    showId: params.showId,
    episodeId: params.episodeId,
  });

  if (!details) {
    return notFound();
  }

  return (
    <main>
      <Banner episode={details} />
      <Videos
        episodeId={params.episodeId}
        tvShowId={params.showId}
        seasonId={params.seasonId}
      />
      <Cast cast={details.credits.cast} title={details.name} />
      <Reviews
        episodeId={parseInt(params.episodeId)}
        tmdbId={parseInt(params.showId)}
        seasonId={parseInt(params.seasonId)}
      />
    </main>
  );
}
