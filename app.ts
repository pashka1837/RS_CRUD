import "dotenv/config";
import { createServer } from "node:http";
import routesAr from "./src/routes/routes";
import { getReqParams } from "./src/utils/utils";

const server = createServer((req, res) => {
  const { curPathName, curMethod } = getReqParams(req);
  console.log(curPathName, curMethod);
  const handler = routesAr[curPathName]?.[curMethod]
    ? routesAr[curPathName][curMethod]
    : routesAr["404"]["ALL"];

  handler(req, res);
});

server.listen(process.env.LOCAL_PORT, () =>
  console.log(`server listening on port: ${process.env.LOCAL_PORT}`)
);
