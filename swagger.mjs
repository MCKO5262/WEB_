import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const app = express();
const port = 3000;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Artist Booking API',
            version: '1.0.0',
            description: 'API for managing users, artists, orders, and events',
        },
    },
    apis: ['./index.mjs'],  // Point to your API files
};

const swaggerSpec = swaggerJsdoc(options);

// Set up Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`API documentation is available at http://localhost:${port}/api-docs`);
});
