const { 
  getEvents,
  getTeamEvents,
} = require('../events');
const {
  getTeams
} = require('../teams');
const {
  getRoomsOccupancy
} = require('../rooms');

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

const getAvailableRoomsDb = async () => {
  const rooms = await getRoomsOccupancy();
  const availableRooms = rooms.filter((room) => {
    const occupancy = room.occupancy;
    const isAvailable = occupancy.every((event) => {
      const from = new Date(event.from);
      const to = new Date(event.to);
      const currentTime = new Date();
      return currentTime < from || currentTime > to;
    });
    return isAvailable;
  });

  return availableRooms;
};

const cacheAvailableRooms = async () => {
  const rooms = await getAvailableRoomsDb();
  const updateCache = await global.redisClient.set('availableRooms', JSON.stringify(rooms));
  if (updateCache) {
    return rooms;
  }
  return [];
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
  cacheAvailableRooms
};