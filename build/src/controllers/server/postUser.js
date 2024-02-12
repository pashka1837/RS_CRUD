import { parsePostBody } from "../../utils/utils.js";
import { validateUserFields } from "../../validators/validators.js";
import { createUser } from "../db/index.js";
const postUser = async (req) => {
    try {
        const newUser = await parsePostBody(req);
        await validateUserFields(newUser);
        const { message, headStatus } = await createUser(newUser);
        return {
            data: { message },
            headStatus: headStatus,
        };
    }
    catch (error) {
        const { message, headStatus } = error;
        return {
            data: { message },
            headStatus: headStatus,
        };
    }
};
export default postUser;
