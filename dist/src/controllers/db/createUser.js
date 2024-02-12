"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const db_1 = __importDefault(require("../../utils/db"));
function createUser(newUser) {
    return new Promise((res, rej) => {
        try {
            const isExists = db_1.default.find((user) => user.username === newUser.username);
            if (isExists) {
                rej({
                    message: "User with this username is already exists",
                    headStatus: "400",
                });
            }
            else {
                db_1.default.push({ ...newUser, id: (0, uuid_1.v4)() });
                res({
                    message: "User created",
                    headStatus: "201",
                });
            }
        }
        catch {
            rej({
                message: "Initial server error",
                headStatus: "500",
            });
        }
    });
}
exports.default = createUser;
