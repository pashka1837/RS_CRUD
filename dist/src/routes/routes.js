"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const index_1 = require("../controllers/server/index");
const headStatuses_1 = __importDefault(require("../constants/headStatuses"));
const routesAr = {
    "api/users": {
        GET: async (req, res) => {
            const { data, headStatus } = await (0, index_1.getUsers)(req);
            (0, utils_1.myResponse)({ res, data, head: headStatuses_1.default[headStatus] });
        },
        POST: async (req, res) => {
            const { data, headStatus } = await (0, index_1.postUser)(req);
            (0, utils_1.myResponse)({ res, data, head: headStatuses_1.default[headStatus] });
        },
    },
    "api/users/:id": {
        GET: async (req, res) => {
            const { data, headStatus } = await (0, index_1.getUserById)(req);
            (0, utils_1.myResponse)({ res, data, head: headStatuses_1.default[headStatus] });
        },
        PUT: async (req, res) => {
            const { data, headStatus } = await (0, index_1.putUser)(req);
            (0, utils_1.myResponse)({ res, data, head: headStatuses_1.default[headStatus] });
        },
        DELETE: async (req, res) => {
            const { data, headStatus } = await (0, index_1.deleteUser)(req);
            (0, utils_1.myResponse)({ res, data, head: headStatuses_1.default[headStatus] });
        },
    },
    "404": {
        ALL: async (_req, res) => {
            const data = {
                message: "Not Found",
            };
            (0, utils_1.myResponse)({ res, data, head: headStatuses_1.default["404"] });
        },
    },
};
exports.default = routesAr;
