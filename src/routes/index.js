/* eslint-disable no-unused-vars */
const authRoutes = require('./auth');
const teamRoutes = require('./teams');
const eventRoutes = require('./events');
const roomRoutes = require('./rooms');
const homeRoutes = require('./home');

const routes = [
  ...authRoutes,
  ...teamRoutes,
  ...eventRoutes,
  ...roomRoutes,
  ...homeRoutes
];

module.exports = routes;