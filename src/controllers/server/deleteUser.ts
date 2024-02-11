import { ControllerServerT, MyResolveMessageT } from "../../types/types";
import { parseUserId } from "../../utils/utils";
import { findUserById } from "../db/findUserById";
import { uuidValidate } from "../../validators/validators";
import deleteUserDB from "../db/deleteUserDB";

const deleteUser: ControllerServerT = async (req) => {
  const userID = parseUserId(req!);
  try {
    await uuidValidate(userID);
    const { id } = await findUserById(userID);
    await deleteUserDB(id);
    return {
      data: { message: "User was deleted" },
      headStatus: "204",
    };
  } catch (error) {
    const { message, headStatus } = error as MyResolveMessageT;
    return {
      data: { message },
      headStatus,
    };
  }
};

export default deleteUser;
