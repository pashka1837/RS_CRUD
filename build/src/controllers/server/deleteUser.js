import { parseUserId } from "../../utils/utils.js";
import { findUserById, deleteUserDB } from "../db/index.js";
import { uuidValidate } from "../../validators/validators.js";
const deleteUser = async (req) => {
    const userID = parseUserId(req);
    try {
        await uuidValidate(userID);
        const { id } = await findUserById(userID);
        await deleteUserDB(id);
        return {
            data: { message: "User was deleted" },
            headStatus: "204",
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
export default deleteUser;
