const hapi = require('@hapi/hapi');
const routes = require('./src/routes');
const authHandler = require('./src/plugins/authHandler');
const redis = require('redis');

require('dotenv').config();

global.redisClient = redis.createClient();
global.redisClient.on('error', (err) => {
  console.log('BE Redis error: ', err);
});

global.redisClient
  .connect()
  .then(() => {
    console.log('BE Redis connected');
  })
  .catch((err) => {
    console.log('BE Redis error: ', err);
  });

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