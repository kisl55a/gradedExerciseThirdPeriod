const Validator = require('validator-json');
const users = require('../models/usersModel')
let schema = {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    location: { type: 'string', required: true },
    category: { type: 'string', required: true },
    price: { type: 'string', required: true },
    date: { type: "string", required: true },
    contacts: { type: "string", required: true },
    images: { required: true },
    deliveryType: { type: "string", required: true }
}

module.exports = {
    checkNewItem: (req, res, next) => {
        let passValidator = new Validator({ ...req.body, images: req.files }, schema, 'object4npass');
        let passErrors = passValidator.validate();
        console.log('passErrors: ', passErrors);
        if (passErrors.length == 0
            && req.files.length < 5
            && (req.body.deliveryType == 'pickup' || req.body.deliveryType == 'shipping')) {
            next()
        } else {
            res.status(400).send(`Check if all of the needed inputs are present and correct
            You should have: 'title', 'description', 'location', 'category', 'images'(not more than 4),
            'price', 'date'(dd.mm.yyyy), 'deliveryType'(either shipping or pickup) and 'contacts' fields 
            `);
        }
    },
    checkTheInputUserDataLogin: (req, res, next) => {
        if (req.body.username
            && req.body.password
            && req.body.username.trim() !== ""
            && req.body.password.trim() !== ""
            && !users.getUserByName(req.body.username)) {
            next()
        }
        else if (users.getUserByName(req.body.username)) {
            res.status(400)
            res.send(`The username is taken already`)
        } else {
            res.status(400)
            res.send(`The credentials are wrong. 
          You need to have "username" and "password"`)
        }
    },
    checkTheInputUserDataEdit: (req, res, next) => {
        if (req.body.username
            && req.body.password
            && req.body.username.trim() !== ""
            && req.body.password.trim() !== "") {
            next()
        } else {
            res.status(400)
            res.send(`The credentials are wrong. 
          You need to have "username" and "password"`)
        }
    },
    checkTheEditedData: (req, res, next) => {
        // TODO Try to find the way how to validate 
        // using schemas
    }
}