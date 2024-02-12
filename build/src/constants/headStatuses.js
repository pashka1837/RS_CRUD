import { createHead } from "../utils/utils.js";
const headStatuses = {
    "200": createHead(200, "OK", "application/json"),
    "201": createHead(201, "Created", "text/plain"),
    "204": createHead(204, "No Content", "text/plain"),
    "400": createHead(400, "Bad Request", "text/plain"),
    "404": createHead(404, "Not Found", "text/plain"),
    "500": createHead(500, "Internal Server Error", "text/plain"),
};
export default headStatuses;
