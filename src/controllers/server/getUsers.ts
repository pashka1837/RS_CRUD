import { ControllerServerT } from "../../types/types";
import users from "../../utils/db";

//THIS function is just so all controllers be the same type,
//and so in future, when i will work with real db,
//I would already have getUsers controller

const getUsers: ControllerServerT = async (req) => {
  const myUsers = users;
  if (!myUsers)
    return {
      data: { users: [] },
      headStatus: "200",
    };
  return {
    data: { users: myUsers },
    headStatus: "200",
  };
};

export default getUsers;
