import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Flipkart API",
      version: "1.0.0",
    },

    servers:[
        {
        url:'http://localhost:3000/api'
       }
    ],

     components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
    
  },
  apis: ["./src/routes/*.ts"], // adjust path if needed
});