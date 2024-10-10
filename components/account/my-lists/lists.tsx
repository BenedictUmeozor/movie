import { getUserLists } from "@/server/database/lists";
import { Favorites, List, Saved } from "./list";

const Lists = async () => {
  const lists = await getUserLists();

  if (!lists) {
    return (
      <div className="my-8 text-center text-medium-white">No lists found</div>
    );
  }

  const favourite = lists.find((list) => list.isFavourite);
  const saved = lists.find((list) => list.isSaved);

  const rest = lists.filter((list) => !list.isFavourite && !list.isSaved);

  return (
    <div className="space-y-8">
      <p className="text-medium-white">{lists.length} lists</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Favorites list={favourite!} />
        <Saved list={saved!} />
        {rest.map((list) => (
          <List key={list._id} list={list} />
        ))}
      </div>
    </div>
  );
};
export default Lists;
