const User = require("../models/user");
const tokenDecoder = require("../models/token_decoder");

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'})
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },

  AddEvent: (req, res) => {
    const user_id = tokenDecoder(req.headers['authorization'].split(' ')[1]).user_id;
    const event = req.body;
  
    User.findOneAndUpdate(
      { _id: user_id },
      { $push: { liked: event } },
      { new: true },
      (err, user) => {
        if (err) {
          res.status(500).json({ message: 'Internal Server Error' });
        } else if (!user) {
          res.status(404).json({ message: 'User not found' });
        } else {
          res.status(200).json({ message: 'Event added successfully' });
        }
      }
    );
  },

  GetUserId: (req, res) => {
    const userId = tokenDecoder(req.headers['authorization'].split(' ')[1]).user_id;
    res.status(201).json({ userId: userId, message: "OK" });
  }
};

module.exports = UsersController;
