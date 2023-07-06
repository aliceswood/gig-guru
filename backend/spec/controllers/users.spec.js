const app = require("../../app");
const request = require("supertest");
const User = require('../../models/user');


describe("/users", () => {
  beforeEach( async () => {
    await User.deleteMany({});
  });


  describe("POST, when email, password and username are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "test@example.com", password: "1234", username: "test1"})
      expect(response.statusCode).toBe(201)
    });

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({email: "test@example.com", password: "1234", username: "test1"})
      let users = await User.find()
      let newUser = users[users.length - 1]
      expect(newUser.email).toEqual("test@example.com")
      expect(newUser.username).toEqual("test1")
    });
  });
})