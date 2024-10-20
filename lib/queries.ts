import { getParticularList, getUserLists } from "@/server/database/lists";
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

export function specificListOptions(listId: string) {
  return queryOptions({
    queryKey: ["specific-list", listId],
    queryFn: async () => {
      const list = await getParticularList(listId);
      if (!list) throw new Error("Something went wrong");
      return list;
    },
    staleTime: 60 * 1000,
    retry: 2,
  });
}
