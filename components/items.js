const express = require('express')
const router = express.Router();
const items = require('../models/itemsModel');
const validators = require('../middlwares/validators');
const jwtStrategy = require('../middlwares/passportJWT');
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
    validators.checkNewItem,
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
        res.status(201).send(items.addNewItem(newItem))
    }
)

router.put('/:id',
    jwtStrategy.authenticate('jwt', { session: false }),
    upload.array('images', 4),
    (req, res) => {
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
        if(items.changeItem(itemToEdit))
        res.send(items.changeItem(itemToEdit))
        else 
        res.status(400).send('No item with such an id')
    }
);

router.delete('/:id',
    jwtStrategy.authenticate('jwt', { session: false }),
    (req, res) => {
        if (items.deleteItem(req.params.id, req.user.id)) {
            res.send(items.getAllItems(req.user.id))
        } else {
            res.status(400).send("No product with such an id");
        }
    }
)

router.get('/search/:keyword?', (req, res) => {
    if(req.query.date){
        res.send(items.searchByDate(req.query.date))    
    }else if(req.query.category){
        res.send(items.searchByCategory(req.query.category))    
    }else if(req.query.location){
        res.send(items.searchByLocation(req.query.location))    
    } else {
        res.status(400).send("Wrong search word");
    }

})
module.exports = router;
