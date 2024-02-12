"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const validators_1 = require("../../validators/validators");
const index_1 = require("../db/index");
const postUser = async (req) => {
    try {
        const newUser = await (0, utils_1.parsePostBody)(req);
        await (0, validators_1.validateUserFields)(newUser);
        const { message, headStatus } = await (0, index_1.createUser)(newUser);
        return {
            data: { message },
            headStatus: headStatus,
        };
    }
    catch (error) {
        const { message, headStatus } = error;
        return {
            data: { message },
            headStatus: headStatus,
        };
    }
};
exports.default = postUser;
