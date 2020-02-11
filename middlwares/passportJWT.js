const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecretKey = require('../secretKey.json');

let options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = jwtSecretKey.secret;

module.exports = passport.use(new JwtStrategy(options, function (jwt_payload, done) {
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