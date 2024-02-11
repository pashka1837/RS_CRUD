import { ControllerServerT, MyResolveMessageT } from "../../types/types";
import { parsePostBody, parseUserId } from "../../utils/utils";
import { findUserById } from "../db/findUserById";
import { uuidValidate } from "../../validators/validators";
import updateUserDB from "../db/updateUserDB";

const putUser: ControllerServerT = async (req) => {
  const userID = parseUserId(req!);
  try {
    await uuidValidate(userID);
    const oldUser = await findUserById(userID);
    const updUser: any = await parsePostBody(req);
    await updateUserDB(oldUser, updUser);
    return {
      data: { message: "User was updated" },
      headStatus: "200",
    };
  } catch (error) {
    const { message, headStatus } = error as MyResolveMessageT;
    return {
      data: { message },
      headStatus,
    };
  }
};

export default putUser;
