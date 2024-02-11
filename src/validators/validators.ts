import { validate } from "uuid";
import { findUserById } from "../controllers/db/findUserById";

export function validateByUserId(userID: string) {
  if (!uuidValidate(userID)) {
    return { data: "wrong user id", headStatus: "400" };
  }
  const user = findUserById(userID);
  if (!user)
    return {
      data: "user with this id doesn't exist",
      headStatus: "404",
    };
}

export async function uuidValidate(userID: string) {
  return new Promise((res, rej) => {
    if (!validate(userID)) rej({ message: "Wrong user id", headStatus: "400" });
    res(null);
  });
}
