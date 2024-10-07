"use client";

import { FavouritesList, SavedList } from "./app-lists";

const Lists = () => {
  return (
    <div className="space-y-8">
      <p className="text-medium-white">2 lists</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <FavouritesList />
        <SavedList />
      </div>
    </div>
  );
};
export default Lists;
