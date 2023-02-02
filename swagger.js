const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Mainenance API',
    description: 'API for maintenance requests'
  },
  host: 'cse341-project2-zacht.onrender.com',
  schemes: ['https']
};

const outputFile = './swaggerDesign.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });