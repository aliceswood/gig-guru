const User = require("../../models/user");
require("../../config/db.js")

describe("User model", () => {

  it("has a email, username and password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "username1", 
    });
    expect(user.password).toEqual("password");
    expect(user.username).toEqual("username1");
    expect(user.email).toEqual("someone@example.com");
    expect(user.liked).toEqual([]);
  });
})