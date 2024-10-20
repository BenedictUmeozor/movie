import ListPage from "@/components/account/my-lists/list-page";
import Container from "@/components/ui/container";
import { validateRequest } from "@/lib/auth";
import { getParticularList } from "@/server/database/lists";
import { getUser } from "@/server/database/user";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const generateMetadata = async ({
  params,
}: {
  params: { listId: string };
}): Promise<Metadata> => {
  const { session } = await validateRequest();

  if (!session) {
    return {
      title: "Unauthorized - Movie Empire",
    };
  }

  const list = await getParticularList(params.listId);
  return {
    title: `${list.name} - Movie Empire`,
  };
};

export default async function Page({ params }: { params: { listId: string } }) {
  const { session } = await validateRequest();

  if (!session) redirect("/sign-in");

  const user = await getUser(session.userId);
  const belongsToUser = user.lists.includes(params.listId);

  if (!belongsToUser) redirect("/my-lists");

  return (
    <main>
      <Container>
        <ListPage listId={params.listId} />
      </Container>
    </main>
  );
}
