const express = require('express');
const mongoose= require('./db.js');
const routes = require('./routes.js');

const app = express();

app.use(express.json());

app.listen(4000,() => console.log('server started at port 4000'));

app.use('/employees',routes);