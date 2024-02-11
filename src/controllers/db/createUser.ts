import { UserT } from "../../types/types";
import { v4 as uuidv4 } from "uuid";

import users from "../../utils/db";

export default function createUser(
  newUser: UserT
): Promise<{ message: string; headStatus: string }> {
  return new Promise((res, rej) => {
    try {
      const isExists = users.find((user) => user.username === newUser.username);
      if (isExists) {
        rej({
          message: "User with this username is already exists",
          headStatus: "400",
        });
      }
      users.push({ ...newUser, id: uuidv4() });
      res({
        message: "User created",
        headStatus: "201",
      });
    } catch {
      rej({
        message: "Initial server error",
        headStatus: "500",
      });
    }
  });
}
