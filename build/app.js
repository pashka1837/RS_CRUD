import "dotenv/config";
import { createServer } from "node:http";
import routesAr from "./src/routes/routes.js";
import { getReqParams } from "./src/utils/utils.js";
const server = createServer((req, res) => {
    const { curPathName, curMethod } = getReqParams(req);
    console.log(curPathName, curMethod);
    const handler = routesAr[curPathName]?.[curMethod]
        ? routesAr[curPathName][curMethod]
        : routesAr["404"]["ALL"];
    handler(req, res);
});
server.listen(process.env.LOCAL_PORT, () => console.log(`server listening on port: ${process.env.LOCAL_PORT}`));
// export default function run({
//   PORT,
//   users,
// }: {
//   PORT: string;
//   users: UserWithId[];
// }) {
// }
// if (!cluster.worker) {
//   console.log(`hey`);
//   run(process.env.LOCAL_PORT!);
// }
// run(process.env.LOCAL_PORT!);
