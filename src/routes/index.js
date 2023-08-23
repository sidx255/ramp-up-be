/* eslint-disable no-unused-vars */
const authRoutes = require('./auth');
const {addUser} = require('../utils/trial');

const routes = [
  {
    method: '*',
    path: '/',
    handler: (request, h) => {
      return 'Hello, world!';
    }
  },
  ...authRoutes
];

module.exports = routes;