const {
  getMyEventsController,
  getAvailableRoomsController,
  getAllUsersController
} = require('../../controllers/home');

const homeRoutes = [
  {
    method: 'GET',
    path: '/myEvents',
    handler: async (request, h) => {
      return getMyEventsController(request, h);
    }
  },
  {
    method: 'GET',
    path: '/availableRooms',
    handler: async (request, h) => {
      return getAvailableRoomsController(request, h);
    }
  },
  {
    method: 'GET',
    path: '/allUsers',
    handler: async (request, h) => {
      return getAllUsersController(request, h);
    }
  }

];

module.exports = homeRoutes;