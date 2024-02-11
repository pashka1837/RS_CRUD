import users from "../../utils/db";

export default async function deleteUserDB(
  idToDeleteUser: string
): Promise<void> {
  return new Promise((res, rej) => {
    const indexDeleteUser = users.findIndex(
      (user) => user.id === idToDeleteUser
    );
    if (indexDeleteUser === -1)
      rej({ message: "Internal Server Error", headStatus: "500" });
    else {
      users.splice(indexDeleteUser, 1);
      res();
    }
  });
}
