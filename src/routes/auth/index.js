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
      const authRegistration = await register(request, h);
      if (authRegistration.email) {
        const user = await userRegistration(request, h);
        return user;
      }
      return authRegistration;
    }
  }
];

module.exports = authRoutes;