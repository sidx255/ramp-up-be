const { 
  getEvents,
  getTeamEvents,
} = require('../events');
const {
  getTeams
} = require('../teams');
const { cacheAvailableRooms } = require('../../utils/roomBooking');

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

module.exports = {
  getMyEvents,
  getAvailableRooms,
};