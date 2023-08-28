const db = require('../../../database/models');
const { bookingCollision, cacheAvailableRooms, nameAndTime } = require('../../utils/roomBooking');
const sendEmailToQueue = require('../../utils/rabbitMq/producer');

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

  const { name, date, time } = nameAndTime(payload);
  if (payload.roomNo)
    await sendEmailToQueue(payload.organizer, name, payload.eventName, payload.roomNo, date, time, 'c');

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
  const eventData = event[1][0].dataValues;
  const { name, date, time } = nameAndTime(eventData);
  if(eventData.roomNo) 
    await sendEmailToQueue(eventData.organizer, name, eventData.eventName, eventData.roomNo, date, time,'u');

  return event;
};

const deleteEvent = async (id) => {
  const eventInfo = await db.Event.findOne({
    where: {
      id
    }
  });
  const event = await db.Event.destroy({
    where: {
      id
    }
  });
  await cacheAvailableRooms();
  const { name, date, time } = nameAndTime(eventInfo);
  if(eventInfo.roomNo)
    await sendEmailToQueue(eventInfo.organizer, name, eventInfo.eventName, eventInfo.roomNo, date, time, 'd');

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