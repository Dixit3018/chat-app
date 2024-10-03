"use strict";
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Chat app API",
        version: "1.0.0",
        description: "Chat app API documentation",
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description: "JWT authorization header using the Bearer scheme. Example: 'Authorization: Bearer {token}'",
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"],
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
