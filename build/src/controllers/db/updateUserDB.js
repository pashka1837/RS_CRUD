import users from "../../utils/db.js";
export default async function updateUserDB(oldUser, updUser) {
    // const db = await import("../../db/db.json", {
    //   assert: { type: "json" },
    // });
    // const users = db.default.users;
    return new Promise((res, rej) => {
        const newUser = oldUser;
        for (const key in updUser) {
            if (newUser[key] && key !== "id")
                newUser[key] = updUser[key];
            else
                continue;
        }
        const indexOfOld = users.findIndex((user) => user.id === newUser.id);
        if (indexOfOld === -1)
            rej({ message: "Internal Server Error", headStatus: "500" });
        else {
            users.splice(indexOfOld, 1, newUser);
            res();
        }
    });
}
