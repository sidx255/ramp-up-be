const {
  login,
  register,
} = require('../../controllers/auth');
const {
  userRegistration
} = require('../../controllers/user');

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
    handler: async (request, h) => {
      const authRegistration = await register(request, h).catch((error) => {
        return h.response(error).code(500);
      });
      if (authRegistration.email) {
        const user = await userRegistration(request, h).
          catch((error) => {
            return h.response(error).code(500);
          });
        return user;
      }
      return authRegistration;
    }
  }
];

module.exports = authRoutes;