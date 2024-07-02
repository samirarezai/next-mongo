
import swaggerJsdoc from 'swagger-jsdoc';
import { OpenAPIV3 } from 'openapi-types';
import path from 'path';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mongodb test',
            version: '1.0.0',
        },
        servers: [{ url: 'http://localhost:3000' }],
    } as OpenAPIV3.Document,
    apis: [ path.join(process.cwd(), './**/*.ts')], // Path to your API files
};

const specs = swaggerJsdoc(options);

export default specs;
