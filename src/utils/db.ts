import { v4 as uuidv4 } from "uuid";
import { UserIdT, UserT } from "../types/types";

let users: (UserT & UserIdT)[] = [
  {
    id: uuidv4(),
    username: "pashk",
    age: 26,
    hobbies: ["snowboard", "hiking"],
  },
  {
    id: "3a5be66d-95e8-41e2-b8f4-63ab7ba5d9b4",
    username: "ololosha",
    age: 27,
    hobbies: ["bowling", "drinking"],
  },
];

export default users;
