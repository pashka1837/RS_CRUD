import { validate as uuidValidate } from "uuid";
import { getUserId, myResponse } from "../utils/utils";
import { MyResponseHeadT, RoutesT } from "../types/types";
import users from "../utils/db";

const routesAr: RoutesT = {
  "api/users": {
    GET: (req, res) => {
      const head: MyResponseHeadT = {
        statusCode: 200,
        statusMessage: "success",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = users;

      myResponse({ res, data, head });
    },
  },
  "api/users/:id": {
    GET: (req, res) => {
      const userID = getUserId(req!);
      if (uuidValidate(userID)) console.log(userID);
      const head: MyResponseHeadT = {
        statusCode: 200,
        statusMessage: "success",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = users;

      myResponse({ res, data, head });
    },
  },
};
export default routesAr;
