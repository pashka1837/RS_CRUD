import { createHead, myResponse } from "../utils/utils";
import { MyStatusT, RoutesT } from "../types/types";
import users from "../utils/db";
import getUserById from "../controllers/server/getUserById";
import { pipeline } from "node:stream/promises";
import postUser from "../controllers/server/postUser";

const head: MyStatusT = {
  "200": createHead(200, "success", "application/json"),
  "201": createHead(201, "success", "text/plain"),
  "400": createHead(400, "error 400", "text/plain"),
  "404": createHead(404, "error 404", "text/plain"),
  "500": createHead(500, "server error 500", "text/plain"),
};

const routesAr: RoutesT = {
  "api/users": {
    GET: (req, res) => {
      const data = users;
      myResponse({ res, data, head: head["200"] });
    },
    POST: async (req, res) => {
      const { data, headStatus } = await postUser(req!);
      myResponse({ res, data, head: head[headStatus] });
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
