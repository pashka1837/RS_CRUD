"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const node_http_1 = require("node:http");
const routes_1 = __importDefault(require("./src/routes/routes"));
const utils_1 = require("./src/utils/utils");
const server = (0, node_http_1.createServer)((req, res) => {
    const { curPathName, curMethod } = (0, utils_1.getReqParams)(req);
    console.log(curPathName, curMethod);
    const handler = routes_1.default[curPathName]?.[curMethod]
        ? routes_1.default[curPathName][curMethod]
        : routes_1.default["404"]["ALL"];
    handler(req, res);
});
server.listen(process.env.LOCAL_PORT, () => console.log(`server listening on port: ${process.env.LOCAL_PORT}`));
