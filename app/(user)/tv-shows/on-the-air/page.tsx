import OnTheAir from "@/components/on-the-air";
import Hero from "@/components/tv-shows/hero";
import { formatNumberWithCommas } from "@/utils/functions";
import { getTvGenres, getOnTheAirTvs } from "@/utils/getters";

export const metadata = {
  title: "On The Air - Movie Empire",
};

export default async function Page() {
  const { results, total_results } = await getOnTheAirTvs(1);
  const { genres } = await getTvGenres();
  const tvShowIds = results.map((tvShow) => tvShow.id);

  return (
    <main>
      <Hero tvShowIds={tvShowIds} genres={genres} />
      <h2 className="my-8 flex flex-col gap-y-1 text-center text-xl font-bold leading-normal tracking-wide md:text-2xl">
        <span>On The Air</span>
        <span className="text-sm text-medium-white">
          {formatNumberWithCommas(total_results)} Tv Shows
        </span>
      </h2>
      <OnTheAir />
    </main>
  );
}
