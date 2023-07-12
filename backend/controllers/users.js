const User = require("../models/user");
const tokenDecoder = require("../models/token_decoder");

const UsersController = {
  Create: (req, res) => {
    const checkEmail = req.body.email;
    
    User.findOne({ email: checkEmail }).then((user) => {
      if (user ) {
        console.log('Account already created')
        res.status(400).json({ message: 'Account already created' })
      } else {
        const user = new User(req.body);
        user.save((err) => {
          if (err) {
            res.status(400).json({ message: 'Bad request' })
          } else {
            res.status(201).json({ message: 'OK' });
          }
        });
      }
    })
  },

  AddEvent: (req, res) => {
    const user_id = tokenDecoder(req.headers['authorization'].split(' ')[1]).user_id;
    const event_id = req.body.event_id;
    console.log(event_id)  

    User.findOneAndUpdate(
      { _id: user_id, liked: { $ne: event_id } }, //Checks if the event is not already in the liked array
      { $push: { liked: event_id } },
      { new: true },
      (err, user) => {
        if (err) {
          res.status(500).json({ message: 'Internal Server Error' });
        } else if (!user) {
            console.log('Event already liked');
          res.status(404).json({ message: 'Event already liked by user' });
        } else {
          res.status(200).json({ message: 'Event added successfully' });
        }
      }
    );
  },

  GetUserId: (req, res) => {
    const user_id = tokenDecoder(req.headers['authorization'].split(' ')[1]).user_id;
    res.status(201).json({ userId: user_id, message: "OK" });
  },

  GetEvents: (req, res) => {
    const { id } = req.params;

    User.findById(id, (err, user) => {
      if (err) {
        res.status(400).send({ message: 'Bad request' });
      } else {
        // console.log(id);
        console.log(typeof req.params.id);
        console.log(user);
        if (user) {
          res.status(200).send({ events: user.liked });
        } else {
          res.status(401).send({ message: 'User not found' });
        }
      }
    });
  }
};

module.exports = UsersController;
