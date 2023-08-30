import fs from 'fs';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API',
      version: '1.0.0',
    },
  },
  apis: ['src/modules/**/controllers/*.controller.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

const jsonFilePath = './swagger_output.json';

fs.writeFileSync(jsonFilePath, JSON.stringify(swaggerSpec, null, 2));

console.log(`Arquivo JSON do Swagger gerado em: ${jsonFilePath}`);

export default swaggerSpec;
 