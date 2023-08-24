const { 
  getRoomsOccupancy,
  getRoomOccupancy,
  // createRoom 
} = require('../../services/rooms');

const getRoomsOccupancyController = async (request, h) => {
  const rooms = await getRoomsOccupancy();
  return h.response(rooms).code(200);
};

const getRoomOccupancyController = async (request, h) => {
  const { id } = request.params;
  const rooms = await getRoomOccupancy(id);
  return h.response(rooms).code(200);
};

module.exports = {
  getRoomsOccupancyController,
  getRoomOccupancyController,
  // createRoomController
};