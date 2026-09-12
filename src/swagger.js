import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Books and Authors API",
      version: "1.0.0",
      description: "API for managing books and authors",
    },
    servers: [
      {
        url: "http://127.0.0.1:3000",
      },
    ],
  },
  apis: ["./src/router.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
