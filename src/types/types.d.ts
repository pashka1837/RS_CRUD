import { ServerResponse, IncomingMessage } from "node:http";

type UserT = {
  username: string;
  age: number;
  hobbies: string[];
};

type UserIdT = {
  id: string;
};

/* response*/

type MyResponseHeadT = {
  statusCode: number;
  statusMessage?: string;
  headers: {
    [key: string]: string;
  };
};

type MyResponseArgsT = {
  res: ServerResponse;
  data: ((UserT & UserIdT) | null)[];
  head: MyResponseHeadT;
};

type RoutesT = {
  [key: string]: {
    [key: string]: (req: IncomingMessage | null, res: ServerResponse) => void;
  };
};

enum Methods {
  GET = "GET",
}
