const db = require('../../../database/models');
const roomsConfig = require('../../constants/rooms/config');

const getRoomsOccupancy = async () => {
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
};
  
const getRoomOccupancy = async (id) => {
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
};

module.exports = {
  getRoomsOccupancy,
  getRoomOccupancy
};