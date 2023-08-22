/* eslint-disable no-unused-vars */
const authRoutes = require('./auth');
const {addUser} = require('../utils/trial');
const routes = [
  {
    method: 'POST',
    path: '/api/user',
    handler: (request, h) => {
      return addUser(request.payload);
    }
  },
  ...authRoutes,
];

module.exports = routes;