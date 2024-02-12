import "dotenv/config";
import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import myServer from "./server";

const numCPUs = availableParallelism();

let PORT = parseInt(process.env.LOCAL_PORT!);
cluster.schedulingPolicy = cluster.SCHED_RR;

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    worker.send(`${PORT + i}`);
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} has been killed`);
    console.log("Starting another worker");
  });
} else {
  process.on("message", (d: string) => {
    myServer(d);
  });
}

// if (cluster.isPrimary) {
//   console.log(`Master server is running`);

//   let workerPORT = parseInt(PORT!) + 1;

//   for (let i = 1; i < numCPUs; i++) {
//     const worker = cluster.fork();
//     worker.send({ PORT: `${parseInt(process.env.LOCAL_PORT!) + i}`!, users });
//   }

//   const myProxy = createServer((req, res) => {
//     const { curPathName, curMethod } = getReqParams(req);
//     const { method, url, headers } = req;
//     const workerReqOptions = {
//       hostname: headers.host,
//       path: url,
//       port: workerPORT,
//       method: method,
//       headers: headers,
//     };
//     req.setEncoding("utf-8");
//     let data = "";
//     req.on("data", (chunk) => {
//       data += chunk;
//     });
//     req.on("end", () => {
//       const workerReq = request(workerReqOptions, (workerRes) => {
//         let workerData = "";
//         workerRes.on("data", (chunk) => {
//           workerData += chunk;
//         });
//         workerRes.on("end", () => {
//           res.writeHead((workerRes.statusCode = 200), "", {
//             "Content-Type": "application/json",
//           });
//           res.end(workerData);
//           if (workerPORT === numCPUs - 1) workerPORT = parseInt(PORT) + 1;
//           else workerPORT += 1;
//         });
//       });
//       workerReq.end(data);
//     });
//   });

//   myProxy.listen(process.env.LOCAL_PORT, () =>
//     console.log(`Main server listening on port: ${process.env.LOCAL_PORT}`)
//   );

//   cluster.on("exit", (worker, _code, _signal) => {
//     console.log(`Process ${worker.process.pid} finished`);
//     cluster.fork();
//   });
// } else {
//   process.on("message", (d: any) => {
//     const { PORT, users } = d;
//     console.log(PORT);
//     const server = createServer((req, res) => {
//       const { curPathName, curMethod } = getReqParams(req);
//       const handler = routesAr[curPathName]?.[curMethod]
//         ? routesAr[curPathName][curMethod]
//         : routesAr["404"]["ALL"];

//       handler(req, res);
//     });

//     server.listen(PORT, () =>
//       console.log(`Worker server listening on port: ${PORT}`)
//     );
//   });
// }
