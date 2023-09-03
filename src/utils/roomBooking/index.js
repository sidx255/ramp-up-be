const db = require('../../../database/models');
const { getRoomsOccupancy } = require('../../services/rooms');

const nameAndTime = (payload) => {
  const name = payload.organizer.split('@')[0];
  const dateObject = new Date(payload.from);
  const date = `${dateObject.getUTCDate()}/${dateObject.getUTCMonth() + 1}/${dateObject.getUTCFullYear()}`;
  const time = dateObject.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
  return { name, date, time };
};

const calculateReminderTime = (from) => {
  const eventDateTime = new Date(from);
  return eventDateTime - 60 * 60 * 1000;
};

const roomBooking = async (updatedDataValues, previousDataValues) => {
      
  if(updatedDataValues.room !== previousDataValues.room) {
    const room = await db.Room.findOne({
      where: {
        id: updatedDataValues.room
      }
    });
    if(room.info === null) {
      room.info = [{
        id: updatedDataValues.id,
        eventName: updatedDataValues.eventName,
        start: updatedDataValues.from,
        end: updatedDataValues.to
      }];
      await db.Room.update({
        info: room.info
      }, {
        where: {
          id: updatedDataValues.room
        }
      });
    }
    else {
      const roomInfo = room.info;
      roomInfo.push({
        id: updatedDataValues.id,
        eventName: updatedDataValues.eventName,
        start: updatedDataValues.from,
        end: updatedDataValues.to
      });
      await db.Room.update({
        info: roomInfo
      }, {
        where: {
          id: updatedDataValues.room
        }
      });
    }
  }
};

const bookingCollision = async (payload) => {
  if (payload.roomNo == null || payload.roomNo == '' || payload.roomNo == undefined) {
    return false;
  }
  
  const events = await db.Event.findAll({
    where: {
      roomNo: payload.roomNo,
      // 10 - 11
      [db.Sequelize.Op.or]: [
        // case 1: 10:15 - 10:30
        {
          from: {
            [db.Sequelize.Op.lt]: payload.to,
            [db.Sequelize.Op.lt]: payload.from
          },
          to: {
            [db.Sequelize.Op.gt]: payload.from,
            [db.Sequelize.Op.gt]: payload.to
          }
        },
        // case 2: 9 to 12
        {
          from: {
            [db.Sequelize.Op.lt]: payload.to,  
            [db.Sequelize.Op.gt]: payload.from
          },
          to: {
            [db.Sequelize.Op.lt]: payload.from,
            [db.Sequelize.Op.lt]: payload.to 
          }
        },
        // case 3: 9 to 10:30
        {
          from: {
            [db.Sequelize.Op.lt]: payload.to,
            [db.Sequelize.Op.gt]: payload.from
          },
          to: {
            [db.Sequelize.Op.gt]: payload.from,
            [db.Sequelize.Op.gt]: payload.to 
          }
        },
        // case 4: 10:30 to 12
        {
          from: {
            [db.Sequelize.Op.lt]: payload.to,
            [db.Sequelize.Op.lt]: payload.from
          },
          to: {
            [db.Sequelize.Op.gt]: payload.from,
            [db.Sequelize.Op.lt]: payload.to
          }
        },
        // addn cases
        {
          from: {
            [db.Sequelize.Op.lt]: payload.to,
            [db.Sequelize.Op.gt]: payload.from
          }
        },
        {
          to: {
            [db.Sequelize.Op.lt]: payload.to,
            [db.Sequelize.Op.gt]: payload.from
          }
        }
      ]
    }
  });
  
  return events.length > 0;
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

module.exports = {
  nameAndTime,
  calculateReminderTime,
  roomBooking,
  bookingCollision,
  cacheAvailableRooms
};
