"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const index_1 = require("../db/index");
const validators_1 = require("../../validators/validators");
const putUser = async (req) => {
    const userID = (0, utils_1.parseUserId)(req);
    try {
        await (0, validators_1.uuidValidate)(userID);
        const oldUser = await (0, index_1.findUserById)(userID);
        const updUser = await (0, utils_1.parsePostBody)(req);
        await (0, index_1.updateUserDB)(oldUser, updUser);
        return {
            data: { message: "User was updated" },
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
exports.default = putUser;
