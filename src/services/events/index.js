const db = require('../../../database/models');
// const { roomBooking } = require('../../utils/roomBooking');

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

const createEvent = async (payload) => {
  const event = await db.Event.create(payload);
  return event;
};

const updateEvent = async (id, payload) => {
  const event = await db.Event.update(payload, {
    where: {
      id
    },
    individualHooks: true 
  });

  return event;
};

const deleteEvent = async (id) => {
  const event = await db.Event.destroy({
    where: {
      id
    }
  });
  return event;
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
};