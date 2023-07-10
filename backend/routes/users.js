const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.patch("/", UsersController.AddEvent);
router.get("/", UsersController.GetUserId);

module.exports = router;
