import { ControllerServerT, MyErrorT } from "../../types/types";
import { parsePostBody } from "../../utils/utils";
import createUser from "../db/createUser";

const postUser: ControllerServerT = async (req) => {
  try {
    const newUser: any = await parsePostBody(req);
    if (
      !newUser.username ||
      typeof newUser.username !== "string" ||
      !newUser.age ||
      typeof newUser.age !== "number" ||
      !newUser.hobbies ||
      !(newUser.hobbies instanceof Array)
    ) {
      return {
        data: { message: "Doesn't contain required fields" },
        headStatus: "400",
      };
    }
    const { message, headStatus } = await createUser(newUser);
    return {
      data: { message },
      headStatus: headStatus,
    };
  } catch (error) {
    const { message, headStatus } = error as MyErrorT;
    return {
      data: { message },
      headStatus: headStatus,
    };
  }
};

export default postUser;
