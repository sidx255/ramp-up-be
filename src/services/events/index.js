const db = require('../../../database/models');
const { bookingCollision, cacheAvailableRooms, nameAndTime } = require('../../utils/roomBooking');
const {
  sendEmailToQueue,
  // scheduleReminder,
  // cancelScheduledReminder
} = require('../../utils/rabbitMq/producer');
const Boom = require('@hapi/boom');

const getEvents = async (userEmail) => {
  try {
    const events = await db.Event.findAll({
      where: {
        empNos: {
          [db.Sequelize.Op.contains]: [userEmail]
        }
      }
    });
    return events;
  } catch (error) {
    throw Boom.badRequest('Error fetching events', error);
  }
};

const getEvent = async (id) => {
  try {
    const event = await db.Event.findOne({
      where: {
        id
      }
    });
    return event;
  } catch (error) {
    throw Boom.badRequest('Error fetching event', error);
  }
};

const getTeamEvents = async (teamId) => {
  try {
    const events = await db.Event.findAll({
      where: {
        empNos: {
          [db.Sequelize.Op.contains]: [teamId]
        }
      }
    });
    return events;
  } catch (error) {
    throw Boom.badRequest('Error fetching team events', error);
  }
};

const createEvent = async (payload) => {
  const t = await db.sequelize.transaction(); 
  try {
    if (await bookingCollision(payload)) {
      throw Boom.conflict('Room already booked for this time');
    }
    const event = await db.Event.create(payload);
    await cacheAvailableRooms();

    const { name, date, time } = nameAndTime(payload);
    if (payload.roomNo) {
      await sendEmailToQueue(payload.organizer, name, payload.eventName, payload.roomNo, date, time, 'c');
    }
    // await scheduleReminder(payload.organizer, name, payload.eventName, payload.roomNo, date, time, 'r');
    
    await t.commit(); 
    return event;
  } catch (error) {
    await t.rollback(); 
    throw Boom.badRequest('Error creating event', error);
  }
};


const updateEvent = async (id, payload) => {
  const t = await db.sequelize.transaction(); 
  try {
    if (await bookingCollision(payload, id)) {
      throw Boom.conflict('Room already booked for this time');
    }
    const event = await db.Event.update(payload, {
      where: {
        id
      },
      individualHooks: true
    });
    await cacheAvailableRooms();
    const eventData = event[1][0].dataValues;
    // const prevData = event[1][0]._previousDataValues;
    const { name, date, time } = nameAndTime(eventData);
    if (payload.roomNo || payload.date || payload.time) {
      await sendEmailToQueue(eventData.organizer, name, eventData.eventName, eventData.roomNo, date, time, 'u');
      // await cancelScheduledReminder(prevData.organizer, name, prevData.eventName, prevData.roomNo, date, time);
    }
    // await scheduleReminder(eventData.organizer, name, eventData.eventName, eventData.roomNo, date, time, eventData.from, 'r');
    await t.commit(); 
    return event;
  } catch (error) {
    await t.rollback(); 
    throw Boom.badRequest('Error updating event', error);
  }
};

const deleteEvent = async (id) => {
  const t = await db.sequelize.transaction(); 
  try {
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
    if (eventInfo.roomNo) {
      await sendEmailToQueue(eventInfo.organizer, name, eventInfo.eventName, eventInfo.roomNo, date, time, 'd');
    }
    // await cancelScheduledReminder(eventInfo.organizer, name, eventInfo.eventName, eventInfo.roomNo, date, time, eventInfo.from);
    await t.commit();
    return event;
  } catch (error) {
    await t.rollback();
    throw Boom.badRequest('Error deleting event', error);
  }
};

module.exports = {
  getEvents,
  getEvent,
  getTeamEvents,
  createEvent,
  updateEvent,
  deleteEvent
};
