import { createServer } from "node:http";
import routesAr from "./src/routes/routes";
import { getReqParams } from "./src/utils/utils";
import users from "./src/utils/db";

import cluster from "node:cluster";

console.log(`worker pid=${process.pid}`);
const PORT = process.env.LOCAL_PORT;
// if (cluster.isWorker) process.send("heu");

// process.on("message", (data) => {
//   console.log(data);
//   const { PORT, dbUsers } = data as any;
//   users.length = 0;
//   users.concat(dbUsers);
const server = createServer((req, res) => {
  const { curPathName, curMethod } = getReqParams(req);
  console.log(curPathName, curMethod);
  const handler = routesAr[curPathName]?.[curMethod]
    ? routesAr[curPathName][curMethod]
    : routesAr["404"]["ALL"];

  handler(req, res);
});

server.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
// });
