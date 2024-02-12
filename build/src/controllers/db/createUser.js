import { v4 as uuidv4 } from "uuid";
import users from "../../utils/db.js";
export default async function createUser(newUser) {
    // const db = await import("../../db/db.json", {
    //   assert: { type: "json" },
    // });
    // const users = db.default.users;
    return new Promise((res, rej) => {
        try {
            const isExists = users.find((user) => user.username === newUser.username);
            if (isExists) {
                rej({
                    message: "User with this username is already exists",
                    headStatus: "400",
                });
            }
            else {
                users.push({ ...newUser, id: uuidv4() });
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
