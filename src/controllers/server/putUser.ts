import { IncomingMessage } from "node:http";
import { ControllerServerT, MyErrorT } from "../../types/types";
import { parsePostBody, parseUserId } from "../../utils/utils";
import { findUserById } from "../db/findUserById";
import { uuidValidate } from "../../validators/validators";
import updateUser from "../db/updateUser";

const putUser: ControllerServerT = async (req) => {
  const userID = parseUserId(req!).trim();
  try {
    await uuidValidate(userID);
    const oldUser = await findUserById(userID);
    const updUser: any = await parsePostBody(req);
    await updateUser(oldUser, updUser);
    return {
      data: { message: "User was updated" },
      headStatus: "200",
    };
  } catch (error) {
    const { message, headStatus } = error as MyErrorT;
    return {
      data: { message },
      headStatus,
    };
  }
};

export default putUser;
