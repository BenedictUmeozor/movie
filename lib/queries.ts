import { getUserLists } from "@/server/database/lists";
import { queryOptions } from "@tanstack/react-query";

export function listOptions() {
  return queryOptions({
    queryKey: ["user-lists"],
    queryFn: async () => {
      const lists = await getUserLists();
      if (!lists) throw new Error("Something went wrong");
      return lists;
    },
    staleTime: 60 * 1000,
    retry: 2,
  });
}
