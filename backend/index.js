const express = require('express');
const mongoose= require('./db.js');

// old import route code
// const routes = require('./routes.js');

// import route
const employeeRoutes=require("./routes/employee");

const app = express();

app.use(express.json());

// route middleware
app.use('/api/employees',employeeRoutes);

// old route code
// app.use('/employees',routes);

app.listen(4000,() => console.log('server started at port 4000'));

