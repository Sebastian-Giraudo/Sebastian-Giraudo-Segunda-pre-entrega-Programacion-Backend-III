import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestión de Usuarios y Mascotas',
            version: '1.0.0',
            description: 'API para la gestión de usuarios y mascotas. Incluye autenticación, autorización y mocking de datos.'
        },
        servers: [
            {
                url: 'http://localhost:8080/api'
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            BearerAuth: []
        }]
    },
    
    apis: [
        './src/routers/users.router.js',
        './src/routers/pets.router.js',
        './src/routers/sessions.router.js',
        './src/routers/mock.router.js',
        './src/routers/adoptions.router.js'
    ]
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUiExpress, swaggerSpec };