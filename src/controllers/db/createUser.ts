import { UserT, UserWithId } from "../../types/types";
import { v4 as uuidv4 } from "uuid";

import users from "../../utils/db";

export default async function createUser(newUser: UserT): Promise<UserWithId> {
  return new Promise((res, rej) => {
    try {
      const isExists = users.find((user) => user.username === newUser.username);
      if (isExists) {
        rej({
          message: "User with this username is already exists",
          headStatus: "400",
        });
      } else {
        const id = uuidv4();
        users.push({ ...newUser, id });
        res({ ...newUser, id });
      }
    } catch {
      rej({
        message: "Initial server error",
        headStatus: "500",
      });
    }
  });
}
