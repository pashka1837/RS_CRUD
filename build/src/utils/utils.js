import dynamicRoutes from "../constants/dynamicRoutes.js";
/*response handlers*/
export function myResponse({ res, data, head }) {
    res.writeHead(head.statusCode, (head.statusMessage = ""), head.headers);
    res.write(JSON.stringify(data));
    res.end();
}
export function createHead(statusCode, statusMessage, contentType) {
    return {
        statusCode,
        statusMessage,
        headers: {
            "Content-Type": contentType,
        },
    };
}
/*get url params*/
function getCurURL(req) {
    const curURL = new URL(`${req.url}`, `http://${req.headers.host}`);
    return curURL.pathname
        .split("/")
        .filter((part) => part)
        .join("/");
}
export function getReqParams(req) {
    let curPathName = getCurURL(req);
    const curMethod = req.method;
    for (let i = 0; i < dynamicRoutes.length; i++) {
        const curRoute = dynamicRoutes.at(i);
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
/*parse data*/
export function parseUserId(req) {
    const curPathName = getCurURL(req);
    const id = curPathName.split("/").at(-1)?.trim();
    return id;
}
export function parsePostBody(req) {
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
