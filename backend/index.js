const express = require('express');
const mongoose = require('./db.js');
require('dotenv').config();

// old import route code
// const routes = require('./routes.js');

// import route
const employeeRoutes = require("./routes/employee");

//import auth routes
const authRoutes = require('./routes/auth.js');

const errorHandler = require('./middlewares/errorHandler.js');

const app = express();
const PORT = process.env.PORT || 3000;

const { swaggerUi, swaggerSpec } = require('./config/swagger.js');

//swagger route 
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));

app.use(express.json());

// route middleware
app.use('/api/employee',employeeRoutes);
app.use('/api/auth',authRoutes);

// old route code
// app.use('/employees',routes);

// Central error handler (should be last middleware)
app.use(errorHandler);

app.listen(PORT,() => console.log(`server started at port ${PORT}`));

