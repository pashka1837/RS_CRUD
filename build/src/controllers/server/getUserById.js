import { parseUserId } from "../../utils/utils.js";
import { findUserById } from "../db/index.js";
import { uuidValidate } from "../../validators/validators.js";
const getUserById = async (req) => {
    const userID = parseUserId(req).trim();
    try {
        await uuidValidate(userID);
        const user = await findUserById(userID);
        return {
            data: { user },
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
export default getUserById;
