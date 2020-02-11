const express = require('express')
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser')


app.use(bodyParser.json());
app.use(cors());

const userComponent = require('./components/users')

app.use('/users', userComponent);

app.listen(port,() => {console.log(`Listening to the port ${port}`)})