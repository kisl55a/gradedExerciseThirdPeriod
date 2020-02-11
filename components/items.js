const express = require('express')
const router = express.Router();
const passwordHash = require('password-hash');
const users = require('../models/usersModel.js');
const items = require('../models/itemsModel');
const basicStrategy = require('../middlwares/passportBasic');
const jwtStrategy = require('../middlwares/passportJWT');
const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../secretKey.json');

router.get('/',
jwtStrategy.authenticate('jwt', { session: false }),
(req, res) => {
    res.send(items.getAllItems(req.user.id))
}
)

module.exports = router;
