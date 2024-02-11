import { UserT } from "../../types/types";
import users from "../../utils/db";

export function findUserById(id: string): UserT | null {
  const user = users.find((u) => u.id === id);
  if (user)
    return {
      username: user.username,
      age: user.age,
      hobbies: user.hobbies,
    };
  return null;
}
