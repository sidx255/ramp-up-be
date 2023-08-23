/* eslint-disable no-unused-vars */
const authRoutes = require('./auth');
const teamRoutes = require('./teams');
const eventRoutes = require('./events');
const roomRoutes = require('./rooms');

const routes = [
  ...authRoutes,
  {
    method: '*',
    path: '/home',
    handler: (request, h) => {
      return 'Hello, home!';
    }
  },
  ...teamRoutes,
  ...eventRoutes,
  ...roomRoutes
];

module.exports = routes;