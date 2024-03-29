import { UserWithId } from "../../types/types";
import users from "../../utils/db";

export default async function updateUserDB(
  oldUser: UserWithId,
  updUser: any
): Promise<UserWithId> {
  return new Promise((res, rej) => {
    const newUser = oldUser as any;
    for (const key in updUser) {
      if (newUser[key] && key !== "id") newUser[key] = updUser[key];
      else continue;
    }
    const indexOfOld = users.findIndex((user) => user.id === newUser.id);
    if (indexOfOld === -1)
      rej({ message: "Internal Server Error", headStatus: "500" });
    else {
      users.splice(indexOfOld, 1, newUser);
      res(newUser);
    }
  });
}
