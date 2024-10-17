import { ListWithUserAndLikes } from "@/types/mongodb";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { PrivateOrPublic } from "../account/my-lists/list";
import { Separator } from "../ui/separator";
import { Fragment } from "react";
import { IListItem } from "@/lib/models/list";
import ListItem from "./listItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import LikeButton from "./like";

const ListPage = ({ list }: { list: ListWithUserAndLikes }) => {
  return (
    <div className="mt-12 space-y-8">
      <Link
        href="/lists"
        className="inline-flex items-center gap-1 text-primary-blue"
      >
        <ChevronLeft size={20} /> Lists
      </Link>
      <header className="flex items-center justify-between">
        <h2 className="text-4xl font-bold max-lg:text-3xl max-md:text-2xl">
          List &quot;{list.name}&quot;
        </h2>
      </header>
      <div className="space-y-3">
        <p className="text-medium-white">{list.description}</p>
        <PrivateOrPublic isPrivate={list.isPrivate} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className={cn("bg-gray-500")}>
              {list.user.fullName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{list.user.username}</span>
        </div>
        <LikeButton list={list} />
      </div>

      <Separator />
      <RenderList items={list.items} />
    </div>
  );
};

const RenderList = ({ items }: { items: IListItem[] }) => {
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
          <ListItem key={item.tmdbId} item={item} />
        ))}
      </div>
    </Fragment>
  );
};
export default ListPage;
