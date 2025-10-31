const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Candidats API For Angular App",
      version: "1.0.0",
      description: "Documentation de mon API REST",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Serveur de développement",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // facultatif mais conseillé
        },
      },
    },
  },
  // Chemins vers les fichiers contenant les annotations
  apis: ["./routes/*.js", "./models/*.js"], // Ajuste selon ta structure
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
