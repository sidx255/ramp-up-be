const { 
  getEvents,
  getTeamEvents,
} = require('../events');
const {
  getTeams
} = require('../teams');
const { cacheAvailableRooms } = require('../../utils/roomBooking');
const { cacheAllUsers } = require('../../utils/user');
const Boom = require('@hapi/boom');

const getMyEvents = async (email) => {
  try {
    const myEvents = await getEvents(email);
    const teams = await getTeams(email);
    const teamEvents = await Promise.all(teams.map(async (team) => {
      const teamEvent = await getTeamEvents(team.id);
      return teamEvent;
    }
    ));
    const allMyEvents = [...myEvents, ...teamEvents.flat()];
    return allMyEvents;
  }
  catch (error) {
    throw Boom.badRequest('Error getting events');
  }
};


const getAvailableRooms = async () => {
  try{
    const availableRooms = await global.redisClient.get('availableRooms');
    if (availableRooms) {
      return JSON.parse(availableRooms);
    }
    const rooms = await cacheAvailableRooms();
    return rooms;
  } catch {
    throw Boom.badRequest('Error getting rooms');
  }
};

const getAllUsers = async () => {
  try {
    const users = await global.redisClient.get('allUsers');
    if(users) {
      return JSON.parse(users);
    }
    return await cacheAllUsers();
  }
  catch (error) {
    throw Boom.badRequest('Error getting users');
  }
};

module.exports = {
  getMyEvents,
  getAvailableRooms,
  getAllUsers
};