const userService = {
  checkUserExists(db, username) {
    return db('users').where({ username });
  },
  registerUser(db, username, password) {
    return db('users')
      .insert([
        {
          username: `${username}`,
          password: `${password}`,
        },
      ])
      .returning('*');
  },
  getUserWithUserName(db, username) {
    return db('users').where({ username }).first();
  },
};

module.exports = userService;
