import "dotenv/config";
import { createServer } from "node:http";
import routesAr from "./routes/routes";
import { getReqParams } from "./utils/utils";

export default function myServer(PORT = process.env.LOCAL_PORT!) {
  const server = createServer((req, res) => {
    const { curPathName, curMethod } = getReqParams(req);
    const handler = routesAr[curPathName]?.[curMethod]
      ? routesAr[curPathName][curMethod]
      : routesAr["404"]["ALL"];

    handler(req, res);
  });

  server.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
  return server;
}
