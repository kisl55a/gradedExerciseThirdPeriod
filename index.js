const express = require('express')
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser')


app.use(bodyParser.json());
app.use(cors());

const userComponent = require('./components/users')
const itemComponent = require('./components/items');

app.use('/users', userComponent);
app.use('/items', itemComponent)

app.listen(port,() => {console.log(`Listening to the port ${port}`)})