"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const users = [
    {
        id: (0, uuid_1.v4)(),
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
exports.default = users;
