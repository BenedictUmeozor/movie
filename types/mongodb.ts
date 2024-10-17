import { IList } from "@/lib/models/list";
import { IReview } from "@/lib/models/review";
import { IUser } from "@/lib/models/user";

export interface ListWithUser extends Omit<IList, "user"> {
  user: IUser;
}

export interface ListWithUserAndLikes extends Omit<ListWithUser, "likes"> {
  likes: { _id: string; user: string }[];
}

export interface ReviewWithUserAndLikes
  extends Omit<IReview, "likes" | "user"> {
  likes: { _id: string; user: string }[];
  user: IUser;
  createdAt: string;
}
