const { 
  getEvents,
  getTeamEvents,
} = require('../events');
const {
  getTeams
} = require('../teams');
const { cacheAvailableRooms } = require('../../utils/roomBooking');
const { cacheAllUsers } = require('../../utils/user');

const getMyEvents = async (email) => {
  const myEvents = await getEvents(email);
  const teams = await getTeams(email);
  const teamEvents = await Promise.all(teams.map(async (team) => {
    const teamEvent = await getTeamEvents(team.id);
    return teamEvent;
  }
  ));
  const allMyEvents = [...myEvents, ...teamEvents.flat()];
  return allMyEvents;
};


const getAvailableRooms = async () => {
  const availableRooms = await global.redisClient.get('availableRooms');
  if (availableRooms) {
    return JSON.parse(availableRooms);
  }
  const rooms = await cacheAvailableRooms();
  return rooms;
};

const getAllUsers = async () => {
  const users = await global.redisClient.get('allUsers');
  if(users) {
    return JSON.parse(users);
  }
  return await cacheAllUsers();
};

module.exports = {
  getMyEvents,
  getAvailableRooms,
  getAllUsers
};