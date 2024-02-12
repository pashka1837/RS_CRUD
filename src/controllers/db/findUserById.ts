import { UserWithId } from "../../types/types";
import users from "../../utils/db";

export default async function findUserById(id: string): Promise<UserWithId> {
  // const db = await import("../../db/db.json", {
  //   assert: { type: "json" },
  // });
  // const users = db.default.users;
  return new Promise((res, rej) => {
    try {
      const user = users.find((u) => u.id === id);
      if (!user)
        rej({
          message: "User with this id doesn't exist",
          headStatus: "404",
        });
      else res(user);
    } catch {
      rej({
        message: "Internal Server Error",
        headStatus: "500",
      });
    }
  });
}
