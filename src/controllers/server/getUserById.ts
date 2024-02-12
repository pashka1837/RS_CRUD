import { parseUserId } from "../../utils/utils";
import { ControllerServerT, MyResolveMessageT } from "../../types/types";
import { findUserById } from "../db/index";
import { uuidValidate } from "../../validators/validators";

const getUserById: ControllerServerT = async (req) => {
  const userID = parseUserId(req!).trim();
  try {
    await uuidValidate(userID);
    const user = await findUserById(userID);
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

export default getUserById;
