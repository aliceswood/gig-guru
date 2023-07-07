const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');


describe("/users", () => {
  afterAll( async () => {
    await User.deleteMany({})
  })

  describe("POST, when email, password and username are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "users@exampletest.com", password: "1234", username: "user1"})
      expect(response.statusCode).toBe(201)
    });

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({email: "users@exampletest.com", password: "1234", username: "user1"})
      let users = await User.find()
      let newUser = users[users.length - 1]
      expect(newUser.email).toEqual("users@exampletest.com")
      expect(newUser.username).toEqual("user1")
    });
  });
})