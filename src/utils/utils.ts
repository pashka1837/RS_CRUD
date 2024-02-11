import { IncomingMessage } from "node:http";
import { MyResponseArgsT, MyResponseHeadT } from "../types/types";
import routesAr from "../routes/routes";
const dynamicRoutes = ["api/users", "api/posts"];

export function myResponse({ res, data, head }: MyResponseArgsT) {
  res.writeHead(head.statusCode, (head.statusMessage = ""), head.headers);
  res.write(JSON.stringify(data));
  res.end();
}

export function createHead(
  statusCode: number,
  statusMessage: string,
  contentType: string
): MyResponseHeadT {
  return {
    statusCode,
    statusMessage,
    headers: {
      "Content-Type": contentType,
    },
  };
}

function getCurURL(req: IncomingMessage) {
  const curURL = new URL(`${req.url}`, `http://${req.headers.host}`);
  return curURL.pathname
    .split("/")
    .filter((part) => part)
    .join("/");
}

export function getReqParams(req: IncomingMessage) {
  let curPathName = getCurURL(req);
  const curMethod = req.method!;
  // const id = curPathName.slice("api/users".length + 1);
  let id = null;

  for (let i = 0; i < dynamicRoutes.length; i++) {
    const curRoute = dynamicRoutes.at(i)!;
    if (!curPathName.includes(curRoute)) continue;
    id = curPathName.slice(curRoute.length + 1);
    if (id) {
      curPathName = curRoute + "/:id";
    }
    break;
  }
  return { curPathName, curMethod };

  // if (!id) {
  //   return { curPathName, curMethod, isDynamic: false };
  // }
  // return { curPathName: splitedPathName + ":id", curMethod, isDynamic: true };
}

/*parse data*/

export function parseUserId(req: IncomingMessage) {
  const curPathName = getCurURL(req);
  const id = curPathName.split("/").at(-1)!;
  return id;
}

export function parsePostBody(req: IncomingMessage): Promise<any> {
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
      } catch (error) {
        rej({ message: "Initial server error", headStatus: "500" });
      }
    });
  });
}
