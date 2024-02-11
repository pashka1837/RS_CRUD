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

type MyStatusT = {
  [key: string]: MyResponseHeadT;
};

type MyResponseArgsT = {
  res: ServerResponse;
  data: ((UserT & UserIdT) | null)[] | string | UserT;
  head: MyResponseHeadT;
};

type RoutesT = {
  [key: string]: {
    [key: string]: (req: IncomingMessage | null, res: ServerResponse) => void;
  };
};
