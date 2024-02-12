"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const index_1 = require("../db/index");
const validators_1 = require("../../validators/validators");
const deleteUser = async (req) => {
    const userID = (0, utils_1.parseUserId)(req);
    try {
        await (0, validators_1.uuidValidate)(userID);
        const { id } = await (0, index_1.findUserById)(userID);
        await (0, index_1.deleteUserDB)(id);
        return {
            data: { message: "User was deleted" },
            headStatus: "204",
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
exports.default = deleteUser;
