const Boom = require('@hapi/boom');
const db = require('../../../database/models');
const roomsConfig = require('../../constants/rooms/config');

const getRoomsOccupancy = async () => {
  try {
    const rooms = await db.Event.findAll({
      attributes: ['eventName', 'organizer', 'roomNo', 'from', 'to'],
    });

    const roomsOccupancy = roomsConfig.map((room) => {
      const roomNo = room.roomNo;
      const roomEvents = rooms.filter((room) => room.roomNo === roomNo);
      const occupancy = roomEvents.map((event) => {
        const organizer = event.organizer;
        const eventName = event.eventName;
        const from = event.from;
        const to = event.to;
        return { organizer, eventName, from, to };
      });
      const noOfEvents = occupancy.length;

      return {
        roomNo,
        noOfEvents,
        occupancy
      };
    });

    return roomsOccupancy;
  } catch (error) {
    throw Boom.badImplementation('Error retrieving room occupancy', error);
  }
};

const getRoomOccupancy = async (id) => {
  try {
    const rooms = await db.Event.findAll({
      where: {
        roomNo: id
      },
      attributes: ['eventName', 'organizer', 'roomNo', 'from', 'to'],
    });

    const roomEvents = rooms.filter((room) => room.roomNo === id);
    const occupancy = roomEvents.map((event) => {
      const organizer = event.organizer;
      const eventName = event.eventName;
      const from = event.from;
      const to = event.to;
      return { organizer, eventName, from, to };
    });
    const noOfEvents = occupancy.length;

    return {
      roomNo: id,
      noOfEvents,
      occupancy
    };
  } catch (error) {
    throw Boom.badImplementation(`Error retrieving occupancy for room ${id}`, error);
  }
};

const searchRooms = async (from, to) => {
  try {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    console.log(from, to, fromDate, toDate);
    const roomsOccupancy = await getRoomsOccupancy();
    const bookedRooms = await db.Event.findAll({
      attributes: ['roomNo'],
      where: {
        [db.Sequelize.Op.or]: [
          {
            from: {
              [db.Sequelize.Op.lt]: toDate,
            },
            to: {
              [db.Sequelize.Op.gt]: fromDate,
            },
          },
        ],
      },
      raw: true,
    });

    const bookedRoomNumbers = bookedRooms.map((event) => event.roomNo);
    const availableRooms = roomsOccupancy.filter((room) => !bookedRoomNumbers.includes(room.roomNo));
    return availableRooms;
  } catch (error) {
    throw Boom.badImplementation('Error searching for available rooms', error);
  }
};

module.exports = {
  getRoomsOccupancy,
  getRoomOccupancy,
  searchRooms
};
