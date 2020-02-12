const express = require('express')
const router = express.Router();
const passwordHash = require('password-hash');
const users = require('../models/usersModel.js');
const items = require('../models/itemsModel');
const basicStrategy = require('../middlwares/passportBasic');
const jwtStrategy = require('../middlwares/passportJWT');
const jwt = require('jsonwebtoken');
const jwtSecretKey = require('../secretKey.json');
var multer = require('multer')
var upload = multer({ dest: '../uploads/' })
fs = require('fs')

router.get('/',
    jwtStrategy.authenticate('jwt', { session: false }),
    (req, res) => {
        res.send(items.getAllItems(req.user.id))
    }
)

router.post('/',
    jwtStrategy.authenticate('jwt', { session: false }),
    upload.array('images', 4),
    (req, res) => {
        let images = []
        req.files.forEach((element, i) => {
            fs.rename(req.files[i].path, './uploads/' + req.files[i].originalname, function (err) {
                if (err) throw err;
            });
            images.push(req.files[i].originalname)
        });
        let newItem = {
            id: items.getNewItemId(),
            idUser: req.user.id,
            ...req.body,
            images
        }
        res.send(items.addNewItem(newItem))
    }
)

router.put('/:id',
    jwtStrategy.authenticate('jwt', { session: false }),
    upload.array('images', 4),
    (req, res) => {
        console.log(req.files);
        if (req.files !== undefined) {
        let images = []
        req.files.forEach((element, i) => {
            fs.rename(req.files[i].path, './uploads/' + req.files[i].originalname, function (err) {
                if (err) throw err;
            });
            images.push(req.files[i].originalname)
        });
             itemToEdit = {
                id: parseInt(req.params.id),
                idUser: req.user.id,
                ...req.body,
                images: images
            }
        } else {
             itemToEdit = {
                id: parseInt(req.params.id),
                idUser: req.user.id,
                ...req.body,
            }
        }

        res.send(items.changeItem(itemToEdit))
    }
);

router.delete('/:id', 
jwtStrategy.authenticate('jwt', { session: false }),
(req, res) => {
    if(items.deleteItem(req.params.id, req.user.id)){
        res.send(items.getAllItems(req.user.id))
    } else {
        res.status(400).send("No product with such an id");
    }
}
)
module.exports = router;
