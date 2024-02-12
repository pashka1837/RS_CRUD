import users from "../../utils/db.js";
export default async function deleteUserDB(idToDeleteUser) {
    // const db = await import("../../db/db.json", {
    //   assert: { type: "json" },
    // });
    // const users = db.default.users;
    return new Promise((res, rej) => {
        const indexDeleteUser = users.findIndex((user) => user.id === idToDeleteUser);
        if (indexDeleteUser === -1)
            rej({ message: "Internal Server Error", headStatus: "500" });
        else {
            users.splice(indexDeleteUser, 1);
            res();
        }
    });
}
