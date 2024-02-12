"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePostBody = exports.parseUserId = exports.getReqParams = exports.createHead = exports.myResponse = void 0;
const dynamicRoutes_1 = __importDefault(require("../constants/dynamicRoutes"));
/*response handlers*/
function myResponse({ res, data, head }) {
    res.writeHead(head.statusCode, (head.statusMessage = ""), head.headers);
    res.write(JSON.stringify(data));
    res.end();
}
exports.myResponse = myResponse;
function createHead(statusCode, statusMessage, contentType) {
    return {
        statusCode,
        statusMessage,
        headers: {
            "Content-Type": contentType,
        },
    };
}
exports.createHead = createHead;
/*get url params*/
function getCurURL(req) {
    const curURL = new URL(`${req.url}`, `http://${req.headers.host}`);
    return curURL.pathname
        .split("/")
        .filter((part) => part)
        .join("/");
}
function getReqParams(req) {
    let curPathName = getCurURL(req);
    const curMethod = req.method;
    for (let i = 0; i < dynamicRoutes_1.default.length; i++) {
        const curRoute = dynamicRoutes_1.default.at(i);
        if (!curPathName.includes(curRoute))
            continue;
        const id = curPathName.slice(curRoute.length + 1);
        if (id) {
            curPathName = curRoute + "/:id";
        }
        break;
    }
    return { curPathName, curMethod };
}
exports.getReqParams = getReqParams;
/*parse data*/
function parseUserId(req) {
    const curPathName = getCurURL(req);
    const id = curPathName.split("/").at(-1)?.trim();
    return id;
}
exports.parseUserId = parseUserId;
function parsePostBody(req) {
    return new Promise((res, rej) => {
        req.setEncoding("utf-8");
        let data = "";
        req?.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            try {
                if (!data)
                    rej({
                        message: "Doesn't contain required fields",
                        headStatus: "400",
                    });
                res(JSON.parse(data));
            }
            catch (error) {
                rej({ message: "Initial server error", headStatus: "500" });
            }
        });
    });
}
exports.parsePostBody = parsePostBody;
