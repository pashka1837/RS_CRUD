import { createServer } from "node:http";
import routesAr from "./src/routes/routes.js";
import { getReqParams } from "./src/utils/utils.js";
import users from "./src/utils/db.js";
import cluster from "node:cluster";
if (cluster.isWorker) {
    console.log(`hey`);
    process.on("message", (data) => {
        console.log(data);
        const { PORT, dbUsers } = data;
        dbUsers.length = 0;
        dbUsers.concat(users);
        const server = createServer((req, res) => {
            const { curPathName, curMethod } = getReqParams(req);
            console.log(curPathName, curMethod);
            const handler = routesAr[curPathName]?.[curMethod]
                ? routesAr[curPathName][curMethod]
                : routesAr["404"]["ALL"];
            handler(req, res);
        });
        server.listen(PORT, () => console.log(`server listening on port: ${PORT}`));
    });
}
