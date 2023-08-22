const {
  login,
  register,
  verify
} = require('../../controllers/auth');

const authRoutes = [
  {
    method: 'POST',
    path: '/login',
    handler: (request, h) => {
      return login(request, h);  
    }
  },
  {
    method: 'POST',
    path: '/register',
    handler: (request, h) => {
      return register(request, h);
    }
  },
  {
    method: 'GET',
    path: '/verify',
    handler: (request, h) => {
      return verify(request, h);
    }
  }
];

module.exports = authRoutes;