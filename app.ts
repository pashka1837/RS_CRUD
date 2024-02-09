import { createServer } from "node:http";

const server = createServer((req, res) => {
  const curURL = new URL(`${req.url}`, `http://${req.headers.host}`);
  const curPathName = curURL.pathname;
  console.log(curURL.pathname, req.url);
  res.setHeader("Content-Type", "text");
  res.end(`huy`);
});

server.listen(3000, () => console.log(`server listening on port: 3000`));
