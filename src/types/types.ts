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

type MyMessageT = {
  message: string;
};

type MyHeadStatusT = {
  headStatus: string;
};

type MyResolveMessageT = MyMessageT & MyHeadStatusT;

type MyUserT = {
  user: UserWithId;
};

type MyUsersT = {
  users: (UserWithId | null)[];
};

type MyResponseArgsT = {
  res: ServerResponse;
  data: MyUserT | MyMessageT | MyUsersT;
  head: MyResponseHeadT;
};

type RoutesT = {
  [key: string]: {
    [key: string]: (req: IncomingMessage | null, res: ServerResponse) => void;
  };
};

type ControllerServerT = (req: IncomingMessage) => Promise<{
  data: MyResponseArgsT["data"] | MyMessageT;
  headStatus: string;
}>;

export {
  UserT,
  UserIdT,
  UserWithId,
  MyResponseHeadT,
  MyStatusT,
  MyMessageT,
  MyHeadStatusT,
  MyResolveMessageT,
  MyUserT,
  MyUsersT,
  MyResponseArgsT,
  RoutesT,
  ControllerServerT,
};
