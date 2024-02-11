import { createHead, myResponse } from "../utils/utils";
import { MyStatusT, RoutesT } from "../types/types";
import users from "../utils/db";
import getUserById from "../controllers/server/getUserById";

const head: MyStatusT = {
  "200": createHead(200, "success", "application/json"),
  "400": createHead(400, "error 400", "text/plain"),
  "404": createHead(404, "error 404", "text/plain"),
};

const routesAr: RoutesT = {
  "api/users": {
    GET: (req, res) => {
      const data = users;
      myResponse({ res, data, head: head["200"] });
    },
  },
  "api/users/:id": {
    GET: (req, res) => {
      const { data, headStatus } = getUserById(req!);
      myResponse({ res, data, head: head[headStatus] });
    },
  },
};
export default routesAr;
