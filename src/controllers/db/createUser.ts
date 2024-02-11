import { UserT } from "../../types/types";
import { v4 as uuidv4 } from "uuid";

import users from "../../utils/db";

export default function createUser(newUser: UserT) {
  return new Promise((res, rej) => {
    try {
      const isExists = users.find((user) => user.username === newUser.username);
      if (isExists) {
        rej("User with this username is already exists");
      }
      users.push({ ...newUser, id: uuidv4() });
      res("user created");
    } catch {
      rej("Initial server error");
    }
  });
}
