/* eslint-disable no-unused-vars */
// routes using hapi
const controllers = require('../controllers');
const routes = [
  {
    method: 'POST',
    path: '/sum',
    handler: (request, h) => {
      return controllers.sum(request.payload.first, request.payload.second).ans;
    }
  },
  {
    method: 'POST',
    path: '/mul',
    handler: (request, h) => {
      return controllers.mul(request.payload.first, request.payload.second).ans;
    }
  },
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      // redirect to /home
      return h.redirect('/home');
    }
  },
  {
    method: 'GET',
    path: '/home',
    handler: (request, h) => {
      return 'lol get redirected';
    }
  }
];

module.exports = routes;