import { ControllerServerT, MyResolveMessageT } from "../../types/types";
import { parsePostBody, parseUserId } from "../../utils/utils";
import { findUserById, updateUserDB } from "../db/index";
import { uuidValidate } from "../../validators/validators";

const putUser: ControllerServerT = async (req) => {
  const userID = parseUserId(req!);
  try {
    await uuidValidate(userID);
    const oldUser = await findUserById(userID);
    const updUser: any = await parsePostBody(req);
    const user = await updateUserDB(oldUser, updUser);
    return {
      data: { user },
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
