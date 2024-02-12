import { parsePostBody, parseUserId } from "../../utils/utils.js";
import { findUserById, updateUserDB } from "../db/index.js";
import { uuidValidate } from "../../validators/validators.js";
const putUser = async (req) => {
    const userID = parseUserId(req);
    try {
        await uuidValidate(userID);
        const oldUser = await findUserById(userID);
        const updUser = await parsePostBody(req);
        await updateUserDB(oldUser, updUser);
        return {
            data: { message: "User was updated" },
            headStatus: "200",
        };
    }
    catch (error) {
        const { message, headStatus } = error;
        return {
            data: { message },
            headStatus,
        };
    }
};
export default putUser;
