import { validate as uuidValidate } from "uuid";
import { parseUserId } from "../../utils/utils";
import { ControllerServerT } from "../../types/types";
import { findUserById } from "../db/findUserById";

const getUserById: ControllerServerT = async (req) => {
  const userID = parseUserId(req!).trim();
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
};

export default getUserById;
