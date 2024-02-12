"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
const headStatuses = {
    "200": (0, utils_1.createHead)(200, "OK", "application/json"),
    "201": (0, utils_1.createHead)(201, "Created", "text/plain"),
    "204": (0, utils_1.createHead)(204, "No Content", "text/plain"),
    "400": (0, utils_1.createHead)(400, "Bad Request", "text/plain"),
    "404": (0, utils_1.createHead)(404, "Not Found", "text/plain"),
    "500": (0, utils_1.createHead)(500, "Internal Server Error", "text/plain"),
};
exports.default = headStatuses;
