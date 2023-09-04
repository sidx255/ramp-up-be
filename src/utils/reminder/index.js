
const {scheduleReminder} = require('../rabbitMq/producer');
const db = require('../../../database/models');
const  {nameAndTime } = require('../../utils/roomBooking');

const checkEventsWithinNextHour = async () => {
  const now = new Date();
  const nextHour = new Date(now.getTime() + 60 * 60 * 1000); 
  const startTime = now.toISOString(); 
  const endTime = nextHour.toISOString(); 
  console.log('Scheduled reminders for events within next hour');


  const eventsWithinNextHour = await db.Event.findAll({
    where: {
      from: {
        [db.Sequelize.Op.between]: [startTime, endTime]
      }
    }
  }
  );

  eventsWithinNextHour.map(async (event) => {
    const { name, date, time } = nameAndTime(event);
    await scheduleReminder(
      event.organizer,
      name,
      event.eventName,
      event.roomNo,
      date,
      time,
      'r'
    );
  }
  );
};

module.exports = checkEventsWithinNextHour;