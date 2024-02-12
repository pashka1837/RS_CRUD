import { myResponse } from "../utils/utils.js";
import { getUserById, postUser, deleteUser, putUser, getUsers, } from "../controllers/server/index.js";
import headStatuses from "../constants/headStatuses.js";
const routesAr = {
    "api/users": {
        GET: async (req, res) => {
            const { data, headStatus } = await getUsers(req);
            myResponse({ res, data, head: headStatuses[headStatus] });
        },
        POST: async (req, res) => {
            const { data, headStatus } = await postUser(req);
            myResponse({ res, data, head: headStatuses[headStatus] });
        },
    },
    "api/users/:id": {
        GET: async (req, res) => {
            const { data, headStatus } = await getUserById(req);
            myResponse({ res, data, head: headStatuses[headStatus] });
        },
        PUT: async (req, res) => {
            const { data, headStatus } = await putUser(req);
            myResponse({ res, data, head: headStatuses[headStatus] });
        },
        DELETE: async (req, res) => {
            const { data, headStatus } = await deleteUser(req);
            myResponse({ res, data, head: headStatuses[headStatus] });
        },
    },
    "404": {
        ALL: async (_req, res) => {
            const data = {
                message: "Not Found",
            };
            myResponse({ res, data, head: headStatuses["404"] });
        },
    },
};
export default routesAr;
