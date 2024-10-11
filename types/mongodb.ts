import { IList } from "@/lib/models/list";
import { IUser } from "@/lib/models/user";

export interface ListWithUser extends Omit<IList, "user"> {
  user: IUser;
}
