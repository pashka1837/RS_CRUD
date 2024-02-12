"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../utils/db"));
//THIS function is just so all controllers be the same type,
//and so in future, when i will work with real db,
//I would already have getUsers controller
const getUsers = async (req) => {
    const myUsers = db_1.default;
    if (!myUsers)
        return {
            data: { users: [] },
            headStatus: "200",
        };
    return {
        data: { users: myUsers },
        headStatus: "200",
    };
};
exports.default = getUsers;
