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
        url: "https://cse341-books-ha50.onrender.com",
      },
    ],
  },
  apis: ["./src/router.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
