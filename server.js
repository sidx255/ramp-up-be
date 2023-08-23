const hapi = require('@hapi/hapi');
const routes = require('./src/routes');
const authHandler = require('./src/plugins/authHandler');
require('dotenv').config();

const server = hapi.server({
  host: 'localhost',
  port: process.env.PORT || 8080
});

const init = async () => {
  server.route(routes);
  await server.register(authHandler);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();