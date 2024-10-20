import ListPage from "@/components/lists/list-page";
import Container from "@/components/ui/container";
import { getParticularList } from "@/server/database/lists";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async ({
  params,
}: {
  params: { listId: string };
}): Promise<Metadata> => {
  const list = await getParticularList(params.listId);
  return {
    title: `${list.name} - Movie Empire`,
  };
};

export default async function Page({ params }: { params: { listId: string } }) {
  const list = await getParticularList(params.listId);

  if (list.isPrivate || list.isFavourite || list.isSaved) {
    redirect("/lists");
  }

  return (
    <main>
      <Container>
        <ListPage list={list} />
      </Container>
    </main>
  );
}
