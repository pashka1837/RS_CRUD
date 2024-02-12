"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../utils/db"));
async function updateUserDB(oldUser, updUser) {
    return new Promise((res, rej) => {
        const newUser = oldUser;
        for (const key in updUser) {
            if (newUser[key] && key !== "id")
                newUser[key] = updUser[key];
            else
                continue;
        }
        const indexOfOld = db_1.default.findIndex((user) => user.id === newUser.id);
        if (indexOfOld === -1)
            rej({ message: "Internal Server Error", headStatus: "500" });
        else {
            db_1.default.splice(indexOfOld, 1, newUser);
            res();
        }
    });
}
exports.default = updateUserDB;
