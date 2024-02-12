"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uuidValidate = exports.validateUserFields = void 0;
const uuid_1 = require("uuid");
// import { findUserById } from "../controllers/db/index";
// export function validateByUserId(userID: string) {
//   if (!uuidValidate(userID)) {
//     return { data: "wrong user id", headStatus: "400" };
//   }
//   const user = findUserById(userID);
//   if (!user)
//     return {
//       data: "user with this id doesn't exist",
//       headStatus: "404",
//     };
// }
async function validateUserFields(newUser) {
    return new Promise((res, rej) => {
        if (!newUser.username ||
            typeof newUser.username !== "string" ||
            !newUser.age ||
            typeof newUser.age !== "number" ||
            !newUser.hobbies ||
            !(newUser.hobbies instanceof Array))
            rej({
                message: "Doesn't contain required fields",
                headStatus: "400",
            });
        else
            res();
    });
}
exports.validateUserFields = validateUserFields;
async function uuidValidate(userID) {
    return new Promise((res, rej) => {
        if (!(0, uuid_1.validate)(userID))
            rej({ message: "Wrong user id", headStatus: "400" });
        else
            res();
    });
}
exports.uuidValidate = uuidValidate;
