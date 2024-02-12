import "dotenv/config";
import cluster from "node:cluster";
// import http from "node:http";
import { availableParallelism } from "node:os";
// import process from "node:process";
import users from "./src/utils/db.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
// import { createServer } from "node:http";
// import routesAr from "./src/routes/routes";
// import { getReqParams } from "./src/utils/utils";
const numCPUs = availableParallelism();
cluster.schedulingPolicy = cluster.SCHED_RR;
// if (cluster.isPrimary) {
//   console.log(`Master server is running`);
//   for (let i = 0; i < numCPUs; i++) {
//     const worker = cluster.fork();
//     worker.send({ PORT: `${parseInt(process.env.LOCAL_PORT!) + i}`!, users });
//   }
//   cluster.on("exit", (worker, _code, _signal) => {
//     console.log(`Process ${worker.process.pid} finished`);
//   });
//   //   cluster.on("error", () => {
//   //     console.log(`some error`);
//   //   });
// } else {
//   process.on("message", (d: any) => {
//     console.log(d);
//   });
// }
cluster.setupPrimary({
    exec: dirname + "/worker.js",
    silent: true,
});
const worker = cluster.fork();
worker.send({ PORT: `${parseInt(process.env.LOCAL_PORT) + 1}`, users });
for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    worker.send({ PORT: `${parseInt(process.env.LOCAL_PORT) + i}`, users });
}
// {
//   "ts-node": {
//     "esm": true, // «———— enabling ESM for ts-node
//   },
//   "ts-node-dev": {
//     "esm": true, // «———— enabling ESM for ts-node
//   },
