const passport = require('passport');
const passwordHash = require('password-hash');
const BasicStrategy = require('passport-http').BasicStrategy;
const users = require('../models/usersModel.js');

module.exports = passport.use(new BasicStrategy(
    function (username, password, done) {
      console.log('password: ', password);
      const user = users.getUserByName(username);
      console.log('user: ', user);
      if (user == undefined) {
        console.log("HTTP Basic username not found");
        return done(null, false, { message: "HTTP Basic username not found" });
      }
      if (passwordHash.verify(password, user.password) !== true) {
        console.log("Wrong passsword");
        return done(null, false, { message: "Username or password is wrong" });
      }
      return done(null, user);
    }
  ));
  