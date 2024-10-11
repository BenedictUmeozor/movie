import { IListItem } from "@/lib/models/list";
import Image from "next/image";
import Link from "next/link";
import ListAction from "./list-action";

const ListItem = ({ item }: { item: IListItem }) => {
  const link =
    item.mediaType === "tv-show"
      ? `/tv-show/${item.tmdbId}`
      : `/movie/${item.tmdbId}`;
  const type = item.mediaType === "tv-show" ? "Series" : "Movie";

  return (
    <div className="aspect-[5/6] rounded p-2 transition-colors hover:bg-light-gray">
      <Link href={link} className="relative mx-auto">
        <Image
          src={process.env.IMG_URL + item.posterPath}
          alt={item.title}
          width={200}
          height={300}
          className="aspect-[5/6] w-full rounded-tl rounded-tr object-cover"
        />
      </Link>
      <div className="mx-auto space-y-2 py-1">
        <Link href={link} className="text-sm font-semibold">
          {item.title}
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-sm text-light-white">{type}</p>
          <ListAction />
        </div>
      </div>
    </div>
  );
};
export default ListItem;
