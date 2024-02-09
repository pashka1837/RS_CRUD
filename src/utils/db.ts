import { v4 as uuidv4 } from "uuid";

const users: (UserT & { id: string })[] = [
  {
    id: uuidv4(),
    username: "pashk",
    age: 26,
    hobbies: ["snowboard", "hiking"],
  },
];
