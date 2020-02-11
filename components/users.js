const express = require('express')
const router = express.Router();
const passport = require('passport');
const passwordHash = require('password-hash');
const BasicStrategy = require('passport-http').BasicStrategy;
const users = require('../services/usersData.js');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecretKey = require('../secretKey.json');


passport.use(new BasicStrategy(
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

let options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = jwtSecretKey.secret;

passport.use(new JwtStrategy(options, function (jwt_payload, done) {
  console.log("Processing JWT payload for token content:");
  console.log(jwt_payload);
  const now = Date.now() / 1000;
  if (jwt_payload.exp > now) {
    done(null, jwt_payload.user);
  }
  else {
    done(null, false);
  }
}));

router.get('/', (req, res, next) => { res.send(users.getAllUsers()) })

router.post('/', (req, res, next) => {
  if (req.body.username
    && req.body.password
    && req.body.username.trim() !== ""
    && req.body.password.trim() !== "") {
    let hashedPassword = passwordHash.generate(req.body.password);
    let length = users.getAllUsers().length
    let response = users.addNewUser({
      id: length + 1,
      username: req.body.username,
      password: hashedPassword
    })
    res.status(201)
    res.send(response);
  } else {
    res.status(400)
    res.send('The credentials are wrong')
  }
})

router.post('/login',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    const response = {
      id: req.user.id,
      username: req.user.username
    };

    const payload = {
      user: response
    };

    const options = {
      expiresIn: '1w'
    }
    const token = jwt.sign(payload, jwtSecretKey.secret, options);
    return res.json({ token });
  })

router.put('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(req.user)
  })

module.exports = router;
