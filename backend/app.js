// app.js

const express = require('express');
const connectDB = require('./config/db');
const bp = require('body-parser');
var cors = require('cors');

// routes
const usersRouter = require("./routes/users");

const app = express();

// Connect to the database
connectDB();

// use body-parser
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// cors
app.use(cors({ origin: true, credentials: true }));

// app.get('/', (req, res) => res.send('Hello Makers'));

// use routes
app.use('/users', usersRouter);

// const port = process.env.PORT || 8082;
const port = 8082;

app.listen(port,  () => console.log(`Server running on port ${port}`));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // respond with details of the error
  res.status(err.status || 500).json({message: 'server error'})
});

module.exports = app;