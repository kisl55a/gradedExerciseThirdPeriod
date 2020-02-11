const express = require('express')
const router = express.Router();
const passwordHash = require('password-hash');
const users = require('../models/usersModel.js');
const basicStrategy = require('../middlwares/passportBasic');
const jwtStrategy = require('../middlwares/passportJWT');
const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../secretKey.json');





function checkTheInputUserData(req, res, next) {
  if (req.body.username
    && req.body.password
    && req.body.username.trim() !== ""
    && req.body.password.trim() !== "")
    next()
  else {
    res.status(400)
    res.send('The credentials are wrong ')
  }

}

router.get('/', (req, res, next) => { res.send(users.getAllUsers()) })

router.post('/', checkTheInputUserData, (req, res, next) => {
  let hashedPassword = passwordHash.generate(req.body.password);
  let length = users.getAllUsers().length
  let response = users.addNewUser({
    id: length + 1,
    username: req.body.username,
    password: hashedPassword
  })
  res.status(201)
  res.send(response);

})

router.post('/login',
  basicStrategy.authenticate('basic', { session: false }),
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
  checkTheInputUserData,
  jwtStrategy.authenticate('jwt', { session: false }),
  (req, res) => {
    let hashedPassword = passwordHash.generate(req.body.password);
    let result = users.changeUser(
      {
        id: req.user.id,
        username: req.body.username,
        password: hashedPassword,
      }
    )
    res.send(result)

  })

module.exports = router;
