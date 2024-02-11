import { IncomingMessage } from "node:http";
import { normalize } from "node:path";

import { MyResponseArgsT, MyResponseHeadT } from "../types/types";
import routesAr from "../routes/routes";

export function myResponse({ res, data, head }: MyResponseArgsT) {
  res.writeHead(head.statusCode, (head.statusMessage = ""), head.headers);
  res.write(JSON.stringify(data));
  res.end();
}

export function errorResponse({ res, data, head }: MyResponseArgsT) {
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
  const curPathName = getCurURL(req);
  const curMethod = req.method!;
  const [splitedPathName, id] = curPathName.split(":");
  console.log(splitedPathName, id);

  if (!id) {
    return { curPathName, curMethod, isDynamic: false };
  }
  return { curPathName: splitedPathName + ":id", curMethod, isDynamic: true };
}

export function parseUserId(req: IncomingMessage) {
  const curPathName = getCurURL(req);
  const id = curPathName.split(":").splice(1).at(0)!;
  return id;
}
