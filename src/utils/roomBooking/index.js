const db = require('../../../database/models');

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

module.exports = {
  roomBooking
};
