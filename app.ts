import { createServer } from "node:http";
import routesAr from "./src/routes/routes";
import { getReqParams } from "./src/utils/utils";

const server = createServer((req, res) => {
  const { curPathName, curMethod, isDynamic } = getReqParams(req);
  console.log(curPathName, curMethod, isDynamic);
  let handler = routesAr[curPathName] && routesAr[curPathName][curMethod];

  if (!handler) {
    res.end();
  } else handler(req, res);
});

server.listen(3000, () => console.log(`server listening on port: 3000`));
