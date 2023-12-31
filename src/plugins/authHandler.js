/* eslint-disable no-unused-vars */
const {
  verify
} = require('../services/auth');
const Boom = require('@hapi/boom');
  
const excludedRoutes = ['/login', '/register'];
  
const validateJWT = async (request, h) => {
  if (!excludedRoutes.includes(request.path)) {  
    const token = request.headers.authorization;
    if (!token) {
      throw Boom.unauthorized('Missing auth token');
    }
    try {
      const result = await verify(token);
      if (!result.success) {
        throw Boom.unauthorized('JWT Invalid');
      }
      request.email = result.email;
      return h.continue;
    } catch (err) {
      throw Boom.unauthorized(err.response.data.message || 'JWT validation failed');
    }
  }
  return h.continue;
};
  
module.exports = {
  name: 'jwt-validator',
  register: (server, options) => {
    server.ext('onPreHandler', validateJWT);
  },
};
  