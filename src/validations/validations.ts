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
