const express = require('express');
const mongoose = require('./db.js');
require('dotenv').config();

// old import route code
// const routes = require('./routes.js');

// import route
const employeeRoutes = require("./routes/employee");

const errorHandler = require('./middlewares/errorHandler.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// route middleware
app.use('/api/employees',employeeRoutes);

// old route code
// app.use('/employees',routes);

// Central error handler (should be last middleware)
app.use(errorHandler);

app.listen(PORT,() => console.log(`server started at port ${PORT}`));

