import Hero from "@/components/search-results/hero-tv";
import SearchResult from "@/components/search-results/tv";
import { getTvGenres, getSearchTvResults } from "@/utils/getters";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  return [];
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { query: string; page: string };
  searchParams: { [key: string]: string | string[] | undefined };
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
      <Hero tvShowId={results[0].id} genres={genres} />
      <SearchResult
        genres={genres}
        results={results}
        searchParams={searchParams}
        total_pages={total_pages}
        params={params}
      />
    </main>
  );
}
