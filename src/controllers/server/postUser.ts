import { ControllerServerT, MyResolveMessageT } from "../../types/types";
import { parsePostBody } from "../../utils/utils";
import { validateUserFields } from "../../validations/validations";
import createUser from "../db/createUser";

const postUser: ControllerServerT = async (req) => {
  try {
    const newUser = await parsePostBody(req);
    await validateUserFields(newUser);
    const { message, headStatus } = await createUser(newUser);
    return {
      data: { message },
      headStatus: headStatus,
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
