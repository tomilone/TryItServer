const express = require('express');
const userService = require('./user-service');

const userRouter = express.Router();
const jsonBodyParser = express.json();

userRouter.route('/register').post(jsonBodyParser, (req, res, next) => {
  let { username, password } = req.body;

  userService
    .checkUserExists(req.app.get('db'), username)
    .then((user) => {
      if (user.length == 1) {
        return res.status(404).json({ error: 'This username already exists!' });
      } else {
        userService
          .registerUser(req.app.get('db'), username, password)
          .then((user) => {
            return res.status(200).json(user);
          });
      }
    })
    .catch(next);
});
userRouter.route('/login').post(jsonBodyParser, (req, res, next) => {
  const { username, userPassword } = req.body;

  if (!username || !userPassword) {
    return res
      .status(404)
      .json({ error: 'Please enter a valid username & password' });
  }
  userService
    .getUserWithUserName(req.app.get('db'), username)
    .then((user) => {
      console.log(user);
      if (!user) {
        res.statusMessage = `No user registered with username: ${username}`;
        return res.status(404).end();
      }
      const { id, password } = user;

      if (password != userPassword) {
        res.statusMessage = `Invalid password`;
        return res.status(401).end();
      }

      return res.status(200).json({ success: id });
    })
    .catch(next);
});

module.exports = userRouter;
