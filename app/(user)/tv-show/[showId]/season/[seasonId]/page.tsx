import Banner from "@/components/season/banner";
import Episodes from "@/components/season/episodes";
import Reviews from "@/components/season/reviews";
import Videos from "@/components/season/videos";
import Cast from "@/components/shared/cast/cast";
import { TVShowController } from "@/types/tvshow";
// import { getSingleTvShow } from "@/utils/getters";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  return [];
};

const getSeasonInfo = async ({
  seasonId,
  showId,
}: {
  showId: string;
  seasonId: string;
}): Promise<TVShowController.Show> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/tv/${showId}/season/${seasonId}?append_to_response=credits&api_key=${process.env.API_KEY}`,
  );

  return response.json();
};

export default async function Page({
  params,
}: {
  params: { showId: string; seasonId: string };
}) {
  const details = await getSeasonInfo({
    seasonId: params.seasonId,
    showId: params.showId,
  });

  //   const tvShow = await getSingleTvShow(Number(params.showId));

  if (!details) {
    return notFound();
  }

  return (
    <main>
      <Banner season={details} />
      <Videos seasonId={params.seasonId} tvShowId={params.showId} />
      <Episodes episodes={details.episodes} showId={params.showId} />
      <Cast cast={details.credits.cast} title={details.name} />
      <Reviews
        seasonId={parseInt(params.seasonId)}
        tmdbId={parseInt(params.showId)}
      />
    </main>
  );
}
