import { validate } from "uuid";
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

export async function validateUserFields(newUser: any): Promise<void> {
  return new Promise((res, rej) => {
    if (
      !newUser.username ||
      typeof newUser.username !== "string" ||
      !newUser.age ||
      typeof newUser.age !== "number" ||
      !newUser.hobbies ||
      !(newUser.hobbies instanceof Array)
    )
      rej({
        message: "Doesn't contain required fields",
        headStatus: "400",
      });
    else res();
  });
}

export async function uuidValidate(userID: string): Promise<void> {
  return new Promise((res, rej) => {
    if (!validate(userID)) rej({ message: "Wrong user id", headStatus: "400" });
    else res();
  });
}
