const {
  getRoomsOccupancyController,
  getRoomOccupancyController,
  // createRoomController,
  searchRoomsController,
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
  {
    method: 'GET',
    path: '/rooms',
    handler: (request, h) => {
      return searchRoomsController(request, h);
    }
  }
];

module.exports = roomRoutes;