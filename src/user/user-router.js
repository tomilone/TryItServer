const express = require('express');
const userService = require('./user-service');

const userRouter = express.Router();
const jsonBodyParser = express.json();

userRouter.route('/register').post(jsonBodyParser, (req, res, next) => {
  let { userName, userPass } = req.body;

  userService
    .checkUserExists(req.app.get('db'), userName)
    .then((user) => {
      if (user.length == 1) {
        return res.status(400).json({ error: 'This username already exists!' });
      } else {
        userService
          .registerUser(req.app.get('db'), userName, userPass)
          .then((user) => {
            return res.status(200).json(user);
          });
      }
    })
    .catch(next);
});
userRouter.route('/login').post(jsonBodyParser, (req, res, next) => {
  const { userName, userPass } = req.body;

  if (!userName || !userPass) {
    return res
      .status(404)
      .json({ error: 'Please enter a valid username & password' });
  }
  userService
    .getUserWithUserName(req.app.get('db'), userName)
    .then((user) => {
      if (!user) {
        res.statusMessage = `No user registered with username: ${userName}`;
        return res.status(404).end();
      }
      const { id, password } = user;

      if (password != userPass) {
        res.statusMessage = `Invalid password`;
        return res.status(401).end();
      }
      console.log(id);
      return res.status(200).json(id);
    })
    .catch(next);
});

module.exports = userRouter;
