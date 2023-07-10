const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');
const JWT = require('jsonwebtoken');
const secret = "secret";


describe("/users", () => {
  afterEach( async () => {
    await User.deleteMany({})
  })

  beforeEach( async () => {
    const user = new User({ email: "test@test.com", password: "12345678", username: "test" })
    await user.save()

    token = JWT.sign({
      user_id: user.id,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - (5 * 60),
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret);
  });


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

  describe("PATCH, when a user likes an event", () => {
    test("the response code is 200", async () => {
      let response = await request(app)
        .patch("/users")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "test1", type: "event"})
      expect(response.statusCode).toBe(200)
    })

    test("the response code is 404", async () => {
      let response = await request(app)
        .patch("/users")
        .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRhODIwODU2ZTFjMWUyNGU1NjNkNTVhIiwiaWF0IjoxNjg4NzM5OTkxLCJleHAiOjE2ODg3NDA1OTF9.fLD32lwcWr9hG5Pk5aSyypKPGx8dPeNLr9VG-DA9i6M`)
        .send({ name: "test1", type: "event"})
      expect(response.statusCode).toBe(404)
    })
  })
})