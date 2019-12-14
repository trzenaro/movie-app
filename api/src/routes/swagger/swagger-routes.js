const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');

const router = express.Router();

const swaggerDefinition = {
  components: {},
  info: {
    title: 'movie-app',
    version: '0.0.1',
    description: 'movie-app',
  },
  host: 'localhost:5000',
  basePath: '/',
  openapi: '3.0.0',
};

const options = {
  swaggerDefinition,
  apis: [`${__dirname}/swagger/documentation.yaml`],
};
const swaggerSpec = swaggerJSDoc(options);

router.get('/swagger.json', (req, res) => {
  res.send(swaggerSpec);
});

router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>ReDoc</title>
        <!-- needed for adaptive design -->
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
  
        <!--
        ReDoc doesn't change outer page styles
        -->
        <style>
          body {
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <redoc spec-url='./swagger/swagger.json'></redoc>
        <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"> </script>
      </body>
    </html>
  `);
});

module.exports = {
  path: '/swagger',
  router,
};
