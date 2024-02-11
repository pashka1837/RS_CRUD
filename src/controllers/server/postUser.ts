import { ControllerServerT } from "../../types/types";
import { createHead, myResponse, parsePostBody } from "../../utils/utils";
import createUser from "../db/createUser";

const postUser: ControllerServerT = async (req) => {
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
      data: "Doesn't contain required fields",
      headStatus: "400",
    };
  }

  try {
    const dbRes = await createUser(newUser);
    return {
      data: dbRes as string,
      headStatus: "201",
    };
  } catch (er) {
    return {
      data: er as string,
      headStatus: "500",
    };
  }
};

export default postUser;
