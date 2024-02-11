import { ServerResponse, IncomingMessage } from "node:http";

type UserT = {
  username: string;
  age: number;
  hobbies: string[];
};

type UserIdT = {
  id: string;
};

type UserWithId = UserIdT & UserT;

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

type MyMessage = {
  message: string;
};
type MyUserT = {
  user: UserWithId;
};

type MyUsersT = {
  users: (UserWithId | null)[];
};

type MyErrorT = {
  message: string;
  headStatus: string;
};

type MyResponseArgsT = {
  res: ServerResponse;
  data: MyUserT | MyMessage | MyUsersT;
  head: MyResponseHeadT;
};

type RoutesT = {
  [key: string]: {
    [key: string]: (req: IncomingMessage | null, res: ServerResponse) => void;
  };
};

type ControllerServerT = (req: IncomingMessage) => Promise<{
  data: MyResponseArgsT["data"] | MyMessage;
  headStatus: string;
}>;
