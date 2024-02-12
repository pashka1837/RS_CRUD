"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../utils/db"));
async function deleteUserDB(idToDeleteUser) {
    return new Promise((res, rej) => {
        const indexDeleteUser = db_1.default.findIndex((user) => user.id === idToDeleteUser);
        if (indexDeleteUser === -1)
            rej({ message: "Internal Server Error", headStatus: "500" });
        else {
            db_1.default.splice(indexDeleteUser, 1);
            res();
        }
    });
}
exports.default = deleteUserDB;
