const db = require('../../../database/models');
const { bookingCollision, cacheAvailableRooms } = require('../../utils/roomBooking');

const getEvents = async (userEmail) => {
  const events = await db.Event.findAll({
    where: {
      empNos: {
        [db.Sequelize.Op.contains]: [userEmail]
      }
    }
  });
  return events;
};
    
const getEvent = async (id) => {
  const event = await db.Event.findOne({
    where: {
      id
    }
  });
  return event;
};

const getTeamEvents = async (teamId) => {
  const events = await db.Event.findAll({
    where: {
      empNos: {
        [db.Sequelize.Op.contains]: [teamId]
      }
    }
  });

  return events;
};

const createEvent = async (payload) => {  
  if(await bookingCollision(payload)) {
    throw new Error('Room already booked for this time');
  }

  const event = await db.Event.create(payload);
  await cacheAvailableRooms();
  return event;
};

const updateEvent = async (id, payload) => {
  if(await bookingCollision(payload)) {
    throw new Error('Room already booked for this time');
  }

  const event = await db.Event.update(payload, {
    where: {
      id
    },
    individualHooks: true 
  });
  await cacheAvailableRooms();
  return event;
};

const deleteEvent = async (id) => {
  const event = await db.Event.destroy({
    where: {
      id
    }
  });
  await cacheAvailableRooms();
  return event;
};

module.exports = {
  getEvents,
  getEvent,
  getTeamEvents,
  createEvent,
  updateEvent,
  deleteEvent
};