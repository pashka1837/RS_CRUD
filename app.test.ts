import myServer from "./src/server";

describe("crud testing", () => {
  let server: any;
  let workingID = "";

  const newUser = {
    username: "ololosha2",
    age: 1337,
    hobbies: ["snowboard", "hiking"],
  };

  beforeAll(() => {
    server = myServer();
  });
  afterAll(() => {
    server.close();
  });

  test("Get all records with a GET api/users", async () => {
    const res = await fetch("http://localhost:3000/api/users", {
      method: "GET",
    });
    const data = await res.json();

    expect(Array.isArray(data.users)).toBe(true);
    expect(data.users.length).toBe(0);
  });

  test("New object is created by a POST api/users", async () => {
    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    });

    const { user } = await res.json();
    workingID = user.id;
    delete user.id;
    const postUser = { ...user };

    expect(postUser).toStrictEqual(newUser);
  });

  test("GET api/user/{userId} request returns record by its id", async () => {
    const resGET = await fetch(`http://localhost:3000/api/users/${workingID}`, {
      method: "GET",
    });
    const { user } = await resGET.json();
    delete user.id;
    const postUser = { ...user };

    expect(postUser).toStrictEqual(newUser);
  });

  test("PUT api/users/{userId} request returns record with the same id", async () => {
    const updUser = {
      username: "lupa",
      age: 1888,
      hobbies: ["nodejs", "coding"],
    };

    const resPUT = await fetch(`http://localhost:3000/api/users/${workingID}`, {
      method: "PUT",
      body: JSON.stringify({ updUser }),
      headers: { "Content-Type": "application/json" },
    });
    const { user } = await resPUT.json();

    expect(user.id).toEqual(workingID);
  });
});
