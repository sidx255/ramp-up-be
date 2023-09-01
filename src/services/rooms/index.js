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

const searchRooms = async (from, to) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  console.log(from, to, fromDate, toDate);
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

  const allRoomNumbers = roomsConfig.map((room) => room.roomNo);

  const availableRoomNumbers = allRoomNumbers.filter(
    (roomNo) => !bookedRoomNumbers.includes(roomNo)
  );

  return availableRoomNumbers;
};


module.exports = {
  getRoomsOccupancy,
  getRoomOccupancy,
  searchRooms
};