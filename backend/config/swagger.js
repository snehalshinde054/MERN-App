// config/swagger.js

const swaggerJsDoc = require('swagger-jsdoc');

const swaggerUi = require('swagger-ui-express');

const options = {
    definition : {
            openapi : '3.0.0',
            info : {
                title : 'MERN Employee API',
                version : '1.0.0',
                description : 'API documentation for MERN Employee Management System',
            },
            servers : [
                {
                    url : 'http://localhost:4000/api' //base url 
                },
            ],
            components : {
                securitySchemes: {
                        bearerAuth:{
                            type:'http',
                            scheme:'bearer',
                            bearerFormat: 'JWT',
                        },
                },
            },
            security: [
                {
                    bearerAuth: [],
                },
            ]
    },
    apis : ['./routes/*.js'], //path of your API route files
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };