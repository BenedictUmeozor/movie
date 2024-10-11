import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import EditList from "./edit";
import { getParticularList } from "@/server/database/lists";
import { Separator } from "@/components/ui/separator";
import { IListItem } from "@/lib/models/list";
import ListItem from "./listItem";
import { Fragment } from "react";
import { PrivateOrPublic } from "./list";

const ListPage = async ({ listId }: { listId: string }) => {
  const list = await getParticularList(listId);

  if (!list) {
    return (
      <div className="mt-12 space-y-8">
        <Link
          href="/my-lists"
          className="inline-flex items-center gap-1 text-primary-blue"
        >
          <ChevronLeft size={20} /> My Lists
        </Link>
        <p className="text-medium-white">List not found</p>
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-8">
      <Link
        href="/my-lists"
        className="inline-flex items-center gap-1 text-primary-blue"
      >
        <ChevronLeft size={20} /> My Lists
      </Link>
      <header className="flex items-center justify-between">
        <h2 className="text-4xl font-bold max-lg:text-3xl max-md:text-2xl">
          List &quot;{list.name}&quot;
        </h2>
        <EditList className="max-md:hidden" list={list} />
      </header>
      <div className="space-y-3">
        <p className="text-medium-white">{list.description}</p>
        <PrivateOrPublic isPrivate={list.isPrivate} />
      </div>
      <EditList className="md:hidden" btnWidth="w-full" list={list} />
      <Separator />
      <RenderList items={list.items} listId={list._id} />
    </div>
  );
};

const RenderList = ({
  items,
  listId,
}: {
  items: IListItem[];
  listId: string;
}) => {
  if (items.length === 0) {
    return <p className="my-12 text-center text-medium-white">List is empty</p>;
  }
  return (
    <Fragment>
      <p className="my-8 text-medium-white">
        Showing {items.length} {items.length === 1 ? "item" : "items"}
      </p>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <ListItem key={item.tmdbId} item={item} listId={listId} />
        ))}
      </div>
    </Fragment>
  );
};

export default ListPage;
