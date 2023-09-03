const { 
  getRoomsOccupancy,
  getRoomOccupancy,
  // createRoom,
  searchRooms
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

const searchRoomsController = async (request, h) => {
  const { from, to } = request.query;
  const rooms = await searchRooms(from, to);
  return h.response(rooms).code(200);
};

module.exports = {
  getRoomsOccupancyController,
  getRoomOccupancyController,
  // createRoomController,
  searchRoomsController,
};