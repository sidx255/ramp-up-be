
const {
  getMyEvents,
  getAvailableRooms,
  getAllUsers
} = require('../../services/home');

const getMyEventsController = async (request, h) => {
  const email = request.email;
  const events = await getMyEvents(email);
  return h.response(events).code(200);
};

const getAvailableRoomsController = async (request, h) => {
  const rooms = await getAvailableRooms();
  return h.response(rooms).code(200);
};

const getAllUsersController = async (request, h) => {
  const users = await getAllUsers();
  return h.response(users).code(200);
};

module.exports = {
  getMyEventsController,
  getAvailableRoomsController,
  getAllUsersController
};