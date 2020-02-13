const express = require('express')
const router = express.Router();
const passwordHash = require('password-hash');
const users = require('../models/usersModel.js');
const basicStrategy = require('../middlwares/passportBasic');
const jwtStrategy = require('../middlwares/passportJWT');
const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../secretKey.json');
const validators = require('../middlwares/validators')


router.get('/', (req, res, next) => { res.send(users.getAllUsers()) })

router.post('/', validators.checkTheInputUserDataLogin, (req, res, next) => {
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

router.get('/login',
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
      expiresIn: '36w'
    }
    const token = jwt.sign(payload, jwtSecretKey.secret, options);
    return res.json({ token });
  })

router.put('/',
  jwtStrategy.authenticate('jwt', { session: false }),
  validators.checkTheInputUserDataEdit,
  (req, res) => {
    let hashedPassword = passwordHash.generate(req.body.password);
    let editedUser = {}
    if(req.body.username == req.user.username){
      editedUser = {
        id: req.user.id,
        username: req.body.username,
        password: hashedPassword,
      }
      let result = users.changeUser(editedUser)
      res.send(result)
    } else if(!users.getUserByName(req.body.username)) {
      editedUser = {
        id: req.user.id,
        username: req.body.username,
        password: hashedPassword
      }
      let result = users.changeUser(editedUser)
      res.send(result)
    } else {
      res.status(400).send("The username is taken already");

    }
  })

module.exports = router;
