import { validate as uuidValidate } from "uuid";
import { IncomingMessage } from "node:http";
import { parseUserId } from "../../utils/utils";
import { UserT } from "../../types/types";
import { findUserById } from "../db/findUserById";

export default function getUserById(req: IncomingMessage): {
  data: UserT | string;
  headStatus: string;
} {
  const userID = parseUserId(req!);
  if (!uuidValidate(userID)) {
    return { data: "wrong user id", headStatus: "400" };
  }
  const user = findUserById(userID);
  if (!user)
    return {
      data: "user with this id doesn't exist",
      headStatus: "404",
    };

  return {
    data: user,
    headStatus: "200",
  };
}
