import Hero from "@/components/search-results/hero-tv";
import SearchResult from "@/components/search-results/tv";
import { TailwindSpinner } from "@/components/ui/spinner";
import { getTvGenres, getSearchTvResults } from "@/utils/getters";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const generateStaticParams = async () => {
  return [];
};

export const generateMetadata = async ({
  params,
}: {
  params: { query: string };
}) => {
  const { results } = await getSearchTvResults({
    query: params.query,
  });

  if (!results || !results.length) {
    return {
      title: "Search Movies",
    };
  }

  return {
    title: `Search Movies - ${results[0].name}`,
    description: `Search Movies - ${results[0].overview}`,
    openGraph: {
      title: `Search Movies - ${results[0].name}`,
      description: `Search Movies - ${results[0].overview}`,
      url: `https://movie-empire.vercel.app/search/tv-shows/${params.query}`,
    },
  };
};

export default async function Page({ params }: { params: { query: string } }) {
  const { results, total_pages, total_results } = await getSearchTvResults({
    query: params.query,
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
        total_results={total_results}
        results={results}
        total_pages={total_pages}
        params={params}
      />
    </main>
  );
}
