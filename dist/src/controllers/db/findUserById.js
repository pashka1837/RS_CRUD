"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../utils/db"));
async function findUserById(id) {
    return new Promise((res, rej) => {
        try {
            const user = db_1.default.find((u) => u.id === id);
            if (!user)
                rej({
                    message: "User with this id doesn't exist",
                    headStatus: "404",
                });
            else
                res(user);
        }
        catch {
            rej({
                message: "Internal Server Error",
                headStatus: "500",
            });
        }
    });
}
exports.default = findUserById;
