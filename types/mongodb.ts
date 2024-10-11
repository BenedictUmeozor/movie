import { IList } from "@/lib/models/list";
import { IUser } from "@/lib/models/user";

export interface ListWithUser extends Omit<IList, "user"> {
  user: IUser;
}

export interface ListWithUserAndLikes extends Omit<ListWithUser, "likes"> {
  likes: { _id: string; user: string }[];
}
