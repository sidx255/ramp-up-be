const {
  getRoomsOccupancyController,
  getRoomOccupancyController,
  // createRoomController,
} = require('../../controllers/rooms');

const roomRoutes = [
  {
    method: 'GET',
    path: '/rooms/availability',
    handler: (request, h) => {
      return getRoomsOccupancyController(request, h);
    }
  },
  {
    method: 'GET',
    path: '/room/{id}/availability',
    handler: (request, h) => {
      return getRoomOccupancyController(request, h);
    }
  },
];

module.exports = roomRoutes;