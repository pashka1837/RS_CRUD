import { myResponse } from "../utils/utils";
import { RoutesT } from "../types/types";
import {
  getUserById,
  postUser,
  deleteUser,
  putUser,
  getUsers,
} from "../controllers/server/index";

import headStatuses from "../constants/headStatuses";

const routesAr: RoutesT = {
  "api/users": {
    GET: async (req, res) => {
      const { data, headStatus } = await getUsers(req!);
      myResponse({ res, data, head: headStatuses[headStatus] });
    },
    POST: async (req, res) => {
      const { data, headStatus } = await postUser(req!);
      myResponse({ res, data, head: headStatuses[headStatus] });
    },
  },
  "api/users/:id": {
    GET: async (req, res) => {
      const { data, headStatus } = await getUserById(req!);
      myResponse({ res, data, head: headStatuses[headStatus] });
    },
    PUT: async (req, res) => {
      const { data, headStatus } = await putUser(req!);
      myResponse({ res, data, head: headStatuses[headStatus] });
    },
    DELETE: async (req, res) => {
      const { data, headStatus } = await deleteUser(req!);
      myResponse({ res, data, head: headStatuses[headStatus] });
    },
  },
};
export default routesAr;
