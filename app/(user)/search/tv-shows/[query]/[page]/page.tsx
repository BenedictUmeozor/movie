import Hero from "@/components/search-results/hero-tv";
import SearchResult from "@/components/search-results/tv";
import { TailwindSpinner } from "@/components/ui/spinner";
import { getTvGenres, getSearchTvResults } from "@/utils/getters";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const generateStaticParams = async () => {
  return [];
};

export default async function Page({
  params,
}: {
  params: { query: string; page: string };
}) {
  const { results, total_pages } = await getSearchTvResults({
    query: params.query,
    page: Number(params.page),
  });
  const { genres } = await getTvGenres();

  if (!results || !results.length) {
    return notFound();
  }

  return (
    <main>
      <Suspense
        fallback={
          <section className="grid h-screen max-h-[600px] w-full animate-pulse place-items-center bg-black">
            <TailwindSpinner className="h-10 w-10" />
          </section>
        }
      >
        <Hero tvShowId={results[0].id} genres={genres} />
      </Suspense>
      <SearchResult
        results={results}
        total_pages={total_pages}
        params={params}
      />
    </main>
  );
}
