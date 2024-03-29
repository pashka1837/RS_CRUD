import { ControllerServerT, MyResolveMessageT } from "../../types/types";
import { parsePostBody } from "../../utils/utils";
import { validateUserFields } from "../../validators/validators";
import { createUser } from "../db/index";

const postUser: ControllerServerT = async (req) => {
  try {
    const newUser = await parsePostBody(req);
    await validateUserFields(newUser);
    const user = await createUser(newUser);
    return {
      data: { user },
      headStatus: "201",
    };
  } catch (error) {
    const { message, headStatus } = error as MyResolveMessageT;
    return {
      data: { message },
      headStatus: headStatus,
    };
  }
};

export default postUser;
