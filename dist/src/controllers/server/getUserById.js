"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const index_1 = require("../db/index");
const validators_1 = require("../../validators/validators");
const getUserById = async (req) => {
    const userID = (0, utils_1.parseUserId)(req).trim();
    try {
        await (0, validators_1.uuidValidate)(userID);
        const user = await (0, index_1.findUserById)(userID);
        return {
            data: { user },
            headStatus: "200",
        };
    }
    catch (error) {
        const { message, headStatus } = error;
        return {
            data: { message },
            headStatus,
        };
    }
};
exports.default = getUserById;
